const { Config, Games } = require('../_helper/db')

module.exports = {
    addConfig,
    removeConfigById,
    cleanUpRemanent,
}

async function addConfig(health = 5, explicit = false) {
    const config = new Config({ health, explicit });
    config.save();
    return config;
}

async function removeConfigById(configId) {
    await Config.deleteOne({ _id: configId })
}

async function cleanUpRemanent() {
    const remanent = await Config.find({
        _id: { $nin: await Games.distinct('config') }
    })

    remanent.forEach(p => removeConfigById(p._id))
}