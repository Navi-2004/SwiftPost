const mongoose = require('mongoose');

// Define the schema for the contest model
const contestSchema = new mongoose.Schema({
  platformName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  contestTiming: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  contestDay: {
    type: String,
    required: true
  }
});

// Create the Contest model using the schema
const Contest = mongoose.model('Contest', contestSchema);

module.exports = Contest;
