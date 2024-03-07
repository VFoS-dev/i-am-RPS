const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    health: { type: Number, default: 100 },
    maxHealth: { type: Number, default: 100 },
    socketId: { type: String, required: true },
    iAm: { type: Schema.Types.ObjectId, ref: 'iAm' },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('player', schema);