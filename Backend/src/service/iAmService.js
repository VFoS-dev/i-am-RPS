const { IAm } = require('../_helper/db')

module.exports = {
    newIAm,
    clearIAm,
    removeIAmById,
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