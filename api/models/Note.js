const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  creationTime: {
    type: Date,
    default: Date.now // Set default value to current date/time

  },
    reminderFrequency: {
        type: String,
        enum: ['daily', 'everyTwoDays', 'everyFiveDays', 'everyFifteenDays','never']
    },
    userId:{ type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true
  }, // Add userId field

});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
