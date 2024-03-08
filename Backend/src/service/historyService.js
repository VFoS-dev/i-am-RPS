const { History } = require('../_helper/db')

module.exports = {
    addHistory
}

async function addHistory(player1Prompt, player2Prompt, winner, reason) {
    const history = new History({ player1: player1Prompt, player2: player2Prompt, winner, reason });
    history.save();
    return history;
}