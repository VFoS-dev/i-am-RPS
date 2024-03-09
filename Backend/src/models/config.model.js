const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    explicit: { type: Boolean, default: false },
    health: { type: Number, default: 5 },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('config', schema);