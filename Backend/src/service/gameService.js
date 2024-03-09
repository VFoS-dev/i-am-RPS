const { Games } = require('../_helper/db')
const { generateRandomCode } = require("../_helper/game")

const populateAll = [
    { path: 'player1', strictPopulate: false, populate: { path: 'iAm' } },
    { path: 'player2', strictPopulate: false, populate: { path: 'iAm' } },
    { path: "history", strictPopulate: false },
    { path: "config", strictPopulate: false },
]

module.exports = {
    newGame,
    findGameByCode,
    getGameById,
    getGameByPlayerId,
}

async function newGame(player1, configId, keyLength = 4, attempts = 0) {
    const code = generateRandomCode(keyLength)
    const existingGame = await Games.findOne({ code })
    if (attempts > 20) {
        keyLength++;
        attempts = 0;
    }

    if (!existingGame) {
        const game = new Games({ code, player1, config: configId });
        await game.save();
        return game;
    }

    return await newGame(player1, configId, keyLength, attempts)
}

async function findGameByCode(code) {
    return await Games.findOne({ code }).populate(populateAll);
}

async function getGameById(id) {
    return await Games.findById(id).populate(populateAll);
}

async function getGameByPlayerId(playerId) {
    return await Games.findOne({
        $or: [
            { "player1._id": playerId, "player1.disconnected": false },
            { "player2._id": playerId, "player2.disconnected": false }
        ]
    }).populate(populateAll);
}