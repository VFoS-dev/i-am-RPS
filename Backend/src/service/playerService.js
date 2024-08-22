const { Player, IAm, Games } = require('../_helper/db');
const { InvalidAttempt } = require('../_helper/error');
const iAmService = require('./iAmService')

module.exports = {
    newPlayer,
    deletePlayer,
    getPlayerById,
    damagePlayer,
    disconnectPlayer,
    updateSocketId,
    removePlayerById,
    changeDefaultPlayer,
    cleanUpRemanent,
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

    await Player.deleteOne({ _id: playerId })
}

async function getPlayerById(playerId) {
    return await Player.findById(playerId).populate([
        { path: 'iAm', strictPopulate: false }
    ]);
}

async function damagePlayer(playerId, damage = 1) {
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

async function removePlayerById(playerId) {
    const player = await getPlayerById(playerId)
    if (!player) return
    if (player.iAm)
        await iAmService.removeIAmById(player.iAm._id)
    await Player.deleteOne({ _id: playerId })
}

async function changeDefaultPlayer(playerId) {
    const player = await getPlayerById(playerId)

    let numbers = new Set([...new Array(12)].map((a, i) => i + 1))
    numbers.delete(player.defaultImage)
    numbers = [...numbers]

    const selected = numbers[Math.floor(numbers.length * Math.random())]
    await Player.updateOne({ _id: playerId }, { defaultImage: selected })

    return selected
}

async function cleanUpRemanent() {
    const remanent = await Player.find({
        $and: [
            { _id: { $nin: await Games.distinct('player1') } },
            { _id: { $nin: await Games.distinct('player2') } }
        ]
    })

    remanent.forEach(p => removePlayerById(p._id))
}