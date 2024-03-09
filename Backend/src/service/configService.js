const { Config } = require('../_helper/db')

module.exports = {
    addConfig
}

async function addConfig(health = 5, explicit = false) {
    const config = new Config({ health, explicit });
    config.save();
    return config;
}