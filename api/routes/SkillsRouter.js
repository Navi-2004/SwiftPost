// Import required modules
const express = require('express');
const router = express.Router();
const SoftSkills = require('../models/SoftSkills');

// Route to get all soft skills entries
router.get('/entries', async (req, res) => {
    try {
      const userId = req.query.userId;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      const entries = await SoftSkills.find({ userId });
      res.json(entries);
    } catch (error) {
      console.error('Error fetching soft skills entries:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Route to add a new soft skills entry
router.post('/entries', async (req, res) => {
  try {
    const { userId, question, userResponse } = req.body;
    const newEntry = new SoftSkills({
      userId,
      question,
      userResponse,
    });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    console.error('Error adding soft skills entry:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
