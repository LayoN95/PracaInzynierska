const mongoose = require('mongoose');

const pirSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    state: {type: Boolean, required: true},
    date: {type: Date, default: Date.now }
});

module.exports = mongoose.model('pirHCSR501', pirzSchema);