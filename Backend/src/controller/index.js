const { errorHandler } = require('../_helper/error');

const modules = {
    game: require('./gameController'),
    google: require('./googleController'),
}

module.exports = (socket) => new Proxy(modules, {
    get: (target, key) => new Proxy(target[key], {
        get: (target, key) => (data, callback) => target[key](socket, data)
            .catch(errorHandler).finally(callback)
    })
})