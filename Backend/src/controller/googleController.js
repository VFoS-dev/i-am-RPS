const { InvalidAttempt } = require('../_helper/error')
const gameService = require('../service/gameService')
const googleService = require('../service/Google')

module.exports = {
    imageSearch
}

async function imageSearch(socket, { gameId, query, page = 0 }) {
    const game = await gameService.getGameById(gameId)
    if (!game) new InvalidAttempt('Game was not found')

    const images = await googleService.ImageSearch(query, { page, explicit: game.config.explicit })

    return {
        success: true,
        images,
        page
    }
}