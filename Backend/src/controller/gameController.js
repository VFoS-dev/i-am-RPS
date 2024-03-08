const { InvalidAttempt } = require('../_helper/error');
const { gameStates } = require('../_helper/game');
const gameService = require('../service/gameService');
const playerService = require('../service/playerService');
const iAmService = require('../service/iAmService');
const { AbeatsB } = require('../service/openai');

module.exports = {
    create,
    join,
    kickPlayer,
    iAm,
    startGame,
}

async function create(socket) {
    const player = await playerService.newPlayer(socket);
    const game = await gameService.newGame(player._id);

    socket.join(game.code);

    updateLobby(socket, game._id);

    return {
        success: true,
        gameId: game._id,
        player,
        gameCode: game.code,
    }
}

async function join(socket, { gameCode }) {
    const game = await gameService.findGameByCode(gameCode);
    if (!game) throw new InvalidAttempt('Game was not found');
    if (game.player2) throw new InvalidAttempt('Game is full');

    const player = await playerService.newPlayer(socket);
    game.player2 = player._id;

    await game.save();

    socket.join(game.code);

    updateLobby(socket, game._id);

    return {
        success: true,
        gameId: game._id,
        player,
        gameCode: game.code,
    }
}

async function kickPlayer(socket, { gameId, playerId }) {
    const game = await gameService.getGameById(gameId);
    if (!game) throw new InvalidAttempt('Game was not found');
    if (game.state !== gameStates.lobby) throw new InvalidAttempt('You can only kick players while the game is in the lobby');
    if (socket.id !== game.player1.id) throw new InvalidAttempt('You are not the game host');
    if (game.player2?.id !== playerId) throw new InvalidAttempt('That Player is no longer in the game');

    const player = await playerService.getPlayerById(game.player2.id);
    kickFromLobby(socket, player.socketId);
    game.player2 = null;

    await game.save();
    await playerService.deletePlayer(player.id);

    updateLobby(socket, game._id);

    return {
        success: true
    }
}

async function startGame(socket, { gameId }) {
    const game = await gameService.getGameById(gameId);
    if (!game) throw new InvalidAttempt('Game was not found');
    if (game.state !== gameStates.lobby) throw new InvalidAttempt('Game has already started')
    if (!game.player1 || !game.player2) throw new InvalidAttempt('Missing a player')

    const playerTurn = 'turn_player' + Math.round(Math.random()) + 1;
    game.state = gameStates[playerTurn];

    await game.save();
    updateLobby(socket, game._id);

    return {
        success: true
    }
}

async function iAm(socket, { gameId, prompt, image }) {
    const game = await gameService.getGameById(gameId);
    if (!game) throw new InvalidAttempt('Game was not found');
    if (game.state === gameStates.lobby)
        throw new InvalidAttempt('Game has not started yet');
    if (game.state === gameStates.results)
        throw new InvalidAttempt('Game has ended');

    const playerTurn = game.state === gameStates.turn_player1 ? 'player1' : 'player2';
    if (game[playerTurn].socketId !== socket.id)
        throw new InvalidAttempt('Not your turn')

    const player = await playerService.getPlayerById(game[playerTurn]._id);

    await iAmService.newIAm(player, prompt, image)

    updateLobby(socket, game._id)
    setTimeout(roundEnd, 3000, socket, { gameId })

    return {
        success: true
    }
}

async function roundEnd(socket, { gameId }) {
    const game = await gameService.getGameById(gameId);
    if (!game) throw new InvalidAttempt('Game was not found');
    if (game.state === gameStates.lobby) throw new InvalidAttempt('Game has not started')
    if (game.state === gameStates.results) throw new InvalidAttempt('Game has ended')

    const check = {
        [gameStates.turn_player1]: {
            nextState: gameStates.turn_player2,
            A: 'player1', B: 'player2',
        },
        [gameStates.turn_player2]: {
            nextState: gameStates.turn_player1,
            A: 'player2', B: 'player1',
        },
    }[game.state]

    game.state = check.nextState;
    await game.save()

    if (game.player1.iAm?.prompt && game.player2.iAm?.prompt) {
        AbeatsB(check.A, check.B).then((info) => handleResult(socket, gameId, info, check))
    }

    updateLobby(socket, gameId)

    return {
        success: true
    }
}

async function handleResult(socket, gameId, { error, reason, answer }, { A: playerA, B: playerB }) {
    const game = await gameService.getGameById(gameId);
    if (!game) throw new InvalidAttempt('Game was not found');

    if (error) {
        game.state = gameStates[`turn_${playerA}`]
        await iAmService.clearIAm(game[playerA].iAm)

        updateLobby(socket, gameId)
        notifyPlayer(socket, gameId, reason)

        return { error, reason }
    }

    let focusPlayer;
    if (answer) { // A won
        focusPlayer = playerB
    } else { // B won or tie
        focusPlayer = playerA
    }

    const player = await playerService.damagePlayer(game[focusPlayer].id)
    await iAmService.clearIAm(game[focusPlayer].id)

    if (!player.health) {
        game.state = gameStates.results
    } else {
        game.state = gameStates[`turn_${focusPlayer}`]
    }

    await game.save();
    updateLobby(socket, gameId)

    return {
        success: true
    }
}

async function updateLobby(socket, gameId) {
    const game = await gameService.getGameById(gameId);

    socket.to(game.code).emit("gameUpdated", game);
    socket.emit("gameUpdated", game);
}

async function notifyPlayer(socket, socketId, message) {
    socket.to(socketId).emit('notify', { message })
}

async function kickFromLobby(socket, socketId) {
    socket.to(socketId).emit("kickFromLobby")
}