const { Games } = require('../_helper/db')
const { generateRandomCode } = require("../_helper/game")
const historyService = require('./historyService')
const playerService = require('./playerService')
const configService = require('./configService')

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
    removeGame,
    cleanUpRemanent,
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

async function removeGame(gameId) {
    const game = await getGameById(gameId)
    if (!game) return
    if (game.history)
        await historyService.removeHistoryByIds(game.history.map(a => a._id))
    if (game.player1)
        await playerService.removePlayerById(game.player1.id)
    if (game.player2)
        await playerService.removePlayerById(game.player2.id)
    if (game.config)
        await configService.removeConfigById(game.config.id)
    await Games.deleteOne({ _id: gameId })
}

async function cleanUpRemanent() {
    /** Clean up games when either:
     * 2+ hours in lobby
     * 30 mins of inactivity
     */

    const thirdMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)

    const games = await Games.find({
        $or: [
            { lastUpdated: { $lt: thirdMinutesAgo }, state: { $ne: "lobby" } },
            { lastUpdated: { $lt: twoHoursAgo } }
        ]
    })

    games.forEach((g) => removeGame(g._id));
}