const mongoose = require('mongoose');
const { gameStates } = require('../_helper/game');
const Schema = mongoose.Schema;

const schema = new Schema({
    code: { type: String, required: true },
    state: { type: String, default: gameStates.lobby },
    history: [{ type: Schema.Types.ObjectId, ref: 'history' }],
    player1: { type: Schema.Types.ObjectId, ref: 'player', required: true },
    player2: { type: Schema.Types.ObjectId, ref: 'player' },
    config: { type: Schema.Types.ObjectId, ref: 'config' }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('game', schema);