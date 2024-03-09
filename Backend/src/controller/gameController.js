const { InvalidAttempt } = require('../_helper/error');
const { gameStates } = require('../_helper/game');
const gameService = require('../service/gameService');
const playerService = require('../service/playerService');
const iAmService = require('../service/iAmService');
const configService = require('../service/configService')
const { AbeatsB } = require('../service/openai');
const { addHistory } = require('../service/historyService');

module.exports = {
    create,
    join,
    kickPlayer,
    iAm,
    startGame,
    playerDisconnect,
    playerReconnect
}

async function create(socket, { explicit, health }) {
    const player = await playerService.newPlayer(socket);
    const config = await configService.addConfig(health, explicit)
    const game = await gameService.newGame(player._id, config._id);

    socket.join(game.code);

    updateLobby(socket, game._id);

    return {
        success: true,
        gameId: game._id,
        player: 1,
        gameCode: game.code,
        socketId: socket.id,
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
        player: 2,
        gameCode: game.code,
        socketId: socket.id,
    }
}

async function kickPlayer(socket, { gameId, playerId }) {
    const game = await gameService.getGameById(gameId);
    if (!game) throw new InvalidAttempt('Game was not found');
    if (game.state !== gameStates.lobby) throw new InvalidAttempt('You can only kick players while the game is in the lobby');
    if (socket.id !== game.player1.id) throw new InvalidAttempt('You are not the game host');
    if (game.player2?.id !== playerId) throw new InvalidAttempt('That Player is no longer in the game');

    const player = await playerService.getPlayerById(game.player2.id);
    game.player2 = null;

    socket.leave(game.code)
    socket.to(player.socketId).emit("kickFromLobby")

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

async function playerDisconnect(socket, reason) {
    const player = await playerService.disconnectPlayer(socket.id);
    if (!player) throw new InvalidAttempt('Player does not exist')

    const game = await gameService.getGameByPlayerId(player._id)
    if (!game) throw new InvalidAttempt('Game does not exist')

    if ((!game.player1 || game.player1.disconnected) && (!game.player2 || game.player2.disconnected)) {
        await game.remove()
    }

    return {
        success: true
    }
}

async function playerReconnect(socket, { socketId, player, gameCode }) {
    const game = await gameService.findGameByCode(gameCode)
    if (!game) throw new InvalidAttempt('Game no longer exists')
    const _player = game[`player${player}`]
    if (_player.socketId !== socketId) throw new InvalidAttempt('Previous player signiture does not match')

    await playerService.updateSocketId(_player.id, socket.id)
    socket.join(game.code);

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
    if (game.state === gameStates.roundEnd)
        throw new InvalidAttempt('Game proccessing selection');
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
            A: 'player1', B: 'player2',
        },
        [gameStates.turn_player2]: {
            A: 'player2', B: 'player1',
        },
    }[game.state]

    game.state = gameStates.roundEnd;
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
        await game.save()

        updateLobby(socket, gameId)
        notifyPlayer(socket, gameId, reason)

        return { error, reason }
    }

    const { focusPlayer, wonPlayer } = {
        1: { focusPlayer: playerB, wonPlayer: playerA },
        0: { focusPlayer: playerA, wonPlayer: playerB, },
    }[+answer]

    const history = addHistory(game.player1.iAm.prompt, game.player2.iAm.prompt, wonPlayer, reason)
    game.history.push(history.id)

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

async function notifyPlayer(socket, socketId, message, title = 'Announcement') {
    socket.to(socketId).emit('notify', { message, title })
}