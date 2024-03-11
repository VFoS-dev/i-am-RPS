const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    playerName: { type: String, required: true },
    defaultImage: { type: Number, default: Math.ceil(Math.random() * 12) },
    health: { type: Number, default: 100 },
    maxHealth: { type: Number, default: 100 },
    socketId: { type: String, required: true },
    disconnected: { type: Boolean, default: false },
    iAm: { type: Schema.Types.ObjectId, ref: 'iAm' },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('player', schema);