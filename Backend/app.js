const { env } = require("./src/_helper/env");
const express = require("express");
const app = express();
require('dotenv').config({ path: __dirname + '/.env' });

const http = require("http");
const port = env('port', 3000);
const server = http.createServer(app).listen(port);
const io = require("socket.io")(server);

const cors = require('cors');
app.use(express.json());
app.use(cors({
  origin: JSON.parse(env('origins', "[\"http://localhost:5173\"]"))
}));

app.get('/', (req, res) => {
  res.json({ "message": "Dear fellow traveler, it is dangerous to go alone; so please turn back." })
})

// implementation of controllers
io.on("connection", require('./src/sockets'));

console.log(`listening on port ${port}`);

