const { InvalidAttempt } = require('../_helper/error');
const gameService = require('../service/gameService');
const playerService = require('../service/playerService');

module.exports = {
    create,
    join,
    kickPlayer,
    iAm,
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

async function kickPlayer(socket, data) {

}

async function iAm(socket, data) {

}

async function updateLobby(socket, gameId) {
    const game = await gameService.getGameById(gameId);
    socket.to(game.code).emit("gameUpdated", game);
}