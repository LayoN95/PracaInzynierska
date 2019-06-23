const mongoose = require('mongoose');

const ds18b20Schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    temperature: {type: String, required: true},
    date: {type: Date, default: Date.now }
});

module.exports = mongoose.model('DS18B20', ds18b20Schema);