const { env } = require('./_helper/env.js')

function log() {
    if (env("SocketLogging", false)) {
        console.log(...arguments)
    }
}


module.exports = function (socket) {
    log("Connection made from socket:", socket.id);

    socket.on("disconnect", (reason) => {
        log("Socket disconnected:", socket.id);
    });
}