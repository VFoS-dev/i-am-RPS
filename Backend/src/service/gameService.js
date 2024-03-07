const { Games } = require('../_helper/db')
const { generateRandomCode } = require("../_helper/game")

module.exports = {
    newGame,
    findGameByCode,
    getGameById,
}

async function newGame(player1, keyLength = 4, attempts = 0) {
    const code = generateRandomCode(keyLength)
    const existingGame = await Games.findOne({ code })
    if (attempts > 20) {
        keyLength++;
        attempts = 0;
    }

    if (!existingGame) {
        const game = new Games({ code, player1, });
        await game.save();
        return game;
    }

    return await newGame(player1, keyLength, attempts)
}

async function findGameByCode(code) {
    return await Games.findOne({ code }).populate([
        {
            path: 'player1', strictPopulate: false,
            populate: { path: 'iAm' }
        },
        {
            path: 'player2', strictPopulate: false,
            populate: { path: 'iAm' }
        },
        { path: "history", strictPopulate: false }
    ]);
}

async function getGameById(id) {
    return await Games.findById(id).populate([
        {
            path: 'player1', strictPopulate: false,
            populate: { path: 'iAm' }
        },
        {
            path: 'player2', strictPopulate: false,
            populate: { path: 'iAm' }
        },
        { path: "history", strictPopulate: false }
    ]);
}