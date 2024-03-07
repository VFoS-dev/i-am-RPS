const gameStates = {
    lobby: "lobby",
    turn_player1: "turn:player1",
    turn_player2: "turn:player2",
    results: "results",
}

const historyResults = {
    player1Won: "player1",
    player2Won: "player2",
}

function generateRandomCode(length = 5) {
    const options = "0123456789";
    return [...new Array(5)].map(_ => options[Math.floor(options.length * Math.random())]).join('')
}

module.exports = {
    gameStates,
    historyResults,
    generateRandomCode,
};