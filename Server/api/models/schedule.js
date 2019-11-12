const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    room_1_timeStart: {type: String},
    room_1_timeEnd: {type: String},
    room_2_timeStart: {type: String},
    room_2_timeEnd: {type: String},
    outdoor_timeStart: {type: String},
    outdoor_timeEnd: {type: String},
});

module.exports = mongoose.model('schedule_status', scheduleSchema);