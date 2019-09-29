const mongoose = require('mongoose');

const devicesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    state: {type: Boolean, required: true},
    window_open: {type: String, required: true},
    hcsr04: {type: String, required: true},
    date: {type: Date, default: Date.now }
});

module.exports = mongoose.model('devices_status', devicesSchema);