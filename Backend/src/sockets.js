const { env } = require('./_helper/env.js')
const controller = require('./controller')
const log = (...arguments) => env("SocketLogging", false) && console.log(...arguments)


module.exports = function (socket) {
    log("Connection made from socket:", socket.id);

    socket.on("disconnect", (reason) => {
        log("Socket disconnected:", socket.id);
    });

    socket.on("game_create", controller(socket).game.create);
    socket.on("game_join", controller(socket).game.join);
    socket.on("game_iAm", controller(socket).game.iAm);
    socket.on("game_kickPlayer", controller(socket).game.kickPlayer);
    socket.on("google_imageSearch", controller(socket).google.imageSearch);

    /*
    socket.on("join_room", (data) => {
        socket.join('data')
        // socket.to(data.room).emit("send", data)
    })
    */
}