const mongoose = require('mongoose');
const { gameStates } = require('../_helper/game');
const Schema = mongoose.Schema;

const schema = new Schema({
    code: { type: String, required: true },
    history: { type: Array, default: [] },
    state: { type: String, default: gameStates.lobby },
    player1: { type: Object, required: true },
    player2: { type: Object, default: null },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('game', schema);