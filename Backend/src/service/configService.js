const { Config } = require('../_helper/db')

module.exports = {
    addConfig,
    removeConfigById,
}

async function addConfig(health = 5, explicit = false) {
    const config = new Config({ health, explicit });
    config.save();
    return config;
}

async function removeConfigById(configId) {
    await Config.deleteOne({ _id: configId })
}