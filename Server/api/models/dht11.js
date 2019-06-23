const mongoose = require('mongoose');

const dht11Schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    temperature: {type: String, required: true},
    humidity: {type: String, required: true},
    date: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Dht11', dht11Schema);