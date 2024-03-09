const { Player, IAm } = require('../_helper/db');
const { InvalidAttempt } = require('../_helper/error');

module.exports = {
    newPlayer,
    deletePlayer,
    getPlayerById,
    damagePlayer,
    disconnectPlayer,
    updateSocketId,
}

async function newPlayer(socket, playerName, health) {
    const player = new Player({ socketId: socket.id, playerName, maxHealth: health, health });
    await player.save();
    return player;
}

async function deletePlayer(playerId) {
    const player = await Player.findById(playerId)
    if (!player) return;

    if (player.iAm) {
        const iAm = await IAm.findById(player.iAm)
        if (iAm) {
            await iAm.remove()
        }
    }

    await player.remove()
}

async function getPlayerById(playerId) {
    return await Player.findById(playerId).populate([
        { path: 'iAm', strictPopulate: false }
    ]);
}

async function damagePlayer(playerId, damage = 10) {
    const player = await getPlayerById(playerId)
    if (!player) throw new InvalidAttempt('Player not found')

    player.health = Math.max(0, player.health - parseFloat(damage))
    await player.save();

    return player;
}

async function disconnectPlayer(socketId) {
    const player = await Player.findOne({ socketId })
    if (!player) return

    player.disconnected = true;
    await player.save()
    return player
}

async function updateSocketId(playerId, socketId) {
    await Player.updateOne({ _id: playerId }, { socketId, disconnected: false })
}