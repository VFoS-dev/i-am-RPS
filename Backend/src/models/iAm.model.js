const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    prompt: { type: String, default: "" },
    image: { type: String, default: "" },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('iAm', schema);