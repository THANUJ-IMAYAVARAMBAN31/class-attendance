const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: true
  },
  classDate: {
    type: String, // YYYY-MM-DD
    required: true
  },
  startTime: {
    type: String, // "10:00"
    required: true
  },
  endTime: {
    type: String, // "10:50"
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Head'
  }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
