const mongoose = require('mongoose');

// Define the schema
const softSkillsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  userResponse: {
    type: String,
    default: ''
  }
});  

// Create the model
const SoftSkills = mongoose.model('SoftSkills', softSkillsSchema);

module.exports = SoftSkills;
