const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    player1: { type: String, required: true },
    player2: { type: String, required: true },
    winner: { type: String, required: true },
    reason: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('history', schema);