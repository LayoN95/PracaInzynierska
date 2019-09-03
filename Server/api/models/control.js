const mongoose = require('mongoose');

const controlSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    time_start: {type: String, required: true},
    time_end: {type: String, required: true},
    date: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Control', controlSchema);