const { env } = require('./_helper/env.js')
const controller = require('./controller')
const log = (...arguments) => env("SocketLogging", false) && console.log(...arguments)


module.exports = function (socket) {
    log("Connection made from socket:", socket.id);

    socket.on("disconnect", controller(socket).game.playerDisconnect);
    socket.on("game_reconnect", controller(socket).game.playerReconnect)
    socket.on("game_create", controller(socket).game.create);
    socket.on("game_join", controller(socket).game.join);
    socket.on("game_iAm", controller(socket).game.iAm);
    socket.on("game_kickPlayer", controller(socket).game.kickPlayer);
    socket.on("game_start", controller(socket).game.startGame)
    socket.on("google_imageSearch", controller(socket).google.imageSearch);
}