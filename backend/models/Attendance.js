const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  timeIn: Date,
  timeOut: Date,
  durationMinutes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['IN', 'OUT'],
    default: 'IN'
  }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);