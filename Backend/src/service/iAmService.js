const { IAm, Player } = require('../_helper/db')

module.exports = {
    newIAm,
    clearIAm,
    removeIAmById,
    cleanUpRemanent,
}

async function newIAm(player, prompt, image) {
    var iAm = player.iAm ? await IAm.findById(player.iAm._id) : new IAm()

    iAm.prompt = prompt;
    iAm.image = image;

    await iAm.save();

    return iAm;
}

async function clearIAm(iAmId) {
    const iAm = await IAm.findById(iAmId)
    if (!iAm) return
    iAm.prompt = ''
    iAm.image = ''
    await iAm.save();
}

async function removeIAmById(iAmId) {
    await IAm.deleteOne({ _id: iAmId })
}

async function cleanUpRemanent() {
    const remanent = await IAm.find({
        _id: { $nin: await Player.distinct('iAm') }
    })

    remanent.forEach(r => removeIAmById(r.id))
}