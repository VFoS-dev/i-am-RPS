const { Player } = require('../_helper/db')

module.exports = {
    newPlayer
}

async function newPlayer(socket) {
    const player = new Player({ socketId: socket.id });
    await player.save();
    return player;
}