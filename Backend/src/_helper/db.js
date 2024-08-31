const mongoose = require('mongoose');
const { env } = require('./env');

mongoose.connect(env("MongoDB_URL", 'mongodb://127.0.0.1:27017/i-am-RPS')).then(() => {
  console.log("Connected to Database");
}).catch((err) => {
  console.log("Not Connected to Database ERROR! ", err);
});

mongoose.Promise = global.Promise;

module.exports = {
  Games: require('../models/games.model'),
  IAm: require('../models/iAm.model'),
  History: require('../models/history.model'),
  Player: require('../models/player.model'),
  Config: require('../models/config.model'),
};