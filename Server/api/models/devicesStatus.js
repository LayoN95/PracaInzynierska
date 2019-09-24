const mongoose = require('mongoose');

const devicesStatusSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    status: {type: Boolean, required: true},
    date: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Devices_Status', devicesStatusSchema);