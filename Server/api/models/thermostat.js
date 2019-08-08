const mongoose = require('mongoose');

const thermostatSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    temperature: {type: String, required: true},
});

module.exports = mongoose.model('thermostat', thermostatSchema);