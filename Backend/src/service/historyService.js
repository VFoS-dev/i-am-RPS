const { History, Games } = require('../_helper/db')

module.exports = {
    addHistory,
    removeHistoryByIds,
    cleanUpRemanent,
}

async function addHistory(player1Prompt, player2Prompt, winner, reason) {
    const history = new History({ player1: player1Prompt, player2: player2Prompt, winner, reason });
    await history.save();
    return history;
}

async function removeHistoryByIds(ids) {
    await History.deleteMany({ _id: { $in: ids } })
}

async function cleanUpRemanent() {
    const remanent = await History.find({
        _id: { $nin: await Games.distinct('history') }
    })

    removeHistoryByIds(remanent.map(h => h._id))
}