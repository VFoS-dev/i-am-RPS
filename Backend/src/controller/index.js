const { env } = require('../_helper/env')
const { fn } = require('../_helper/misc')
const { errorHandler } = require('../_helper/error');
const log = (...arguments) => env("SocketLogging", false) && console.log(...arguments)

const modules = {
    game: require('./gameController'),
    google: require('./googleController'),
}

module.exports = (socket) => new Proxy(modules, {
    get: (target, _key) => new Proxy(target[_key], {
        get: (target, key) => (data, callback = fn) => {
            log(`- - Socket: ${socket.id} - - Call: ${_key}.${key}`)
            target[key](socket, data)
                .then(callback).catch((e) => typeof callback == 'function' && callback(errorHandler(e))
                )
        }
    })
})