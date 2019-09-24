const mongoose = require('mongoose');

const devicesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    state: {type: Boolean, required: true},
    date: {type: Date, default: Date.now }
});

module.exports = mongoose.model('devices_status', devicesSchema);