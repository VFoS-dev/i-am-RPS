// enviroment variables
require('dotenv').config({ path: __dirname + '/.env' });
const { env } = require("./src/_helper/env");
const port = env('port', 3000);
const origins = JSON.parse(env('origins', "[\"http://localhost:5173\"]"))

// imports
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require('cors');


// server setup
app.use(cors());
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: origins
  }
});

// port assignment
server.listen(port, () => {
  console.log(`listening on port ${port}`);
})

// server up port
app.get('/', (req, res) => res.json({
  message: "Dear fellow traveler, it is dangerous to go alone; so please turn back.",
  success: true
}))

// implementation of controllers
io.on("connection", require('./src/sockets'));