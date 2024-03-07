const { errorHandler } = require('../_helper/error');
const { fn } = require('../_helper/misc');

const modules = {
    game: require('./gameController'),
    google: require('./googleController'),
}

module.exports = (socket) => new Proxy(modules, {
    apply: (target, thisArg, [data, callback = fn]) =>
        target(socket, data).catch(errorHandler).finally(callback)
})