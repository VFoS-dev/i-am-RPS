const { IAm } = require('../_helper/db')

module.exports = {
    newIAm,
    clearIAm
}

async function newIAm(player, prompt, image) {
    var iAm = player.iAm ? await IAm.findById(player.iAm) : new IAm()

    iAm.prompt = prompt;
    iAm.image = image;

    await iAm.save();

    return iAm;
}

async function clearIAm(iAmId) {
    const iAm = await IAm.findById(iAmId)
    iAm.prompt = ''
    iAm.image = ''
    await iAm.save();
}