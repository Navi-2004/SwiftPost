const express = require('express');
const router = express.Router();
const Contest = require('../models/Contest');

// Route to create a new contest entry
router.post('/add', async (req, res) => {
  try {
    const { platformName, username, contestTiming, userId, contestDay } = req.body;
    
    // Create a new contest entry
    console.log(req.body);
    const contest = new Contest({
      platformName,
      username,
      contestTiming,
      userId,
      contestDay
    });

    const savedContest = await contest.save(); 
    console.log("Contest Information Saved");

    res.status(200).json(savedContest); 
  } catch (error) {
    console.log(req.body);
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/find', async (req, res) => {
  try {
    const platformName = req.query.platformName;
    console.log(platformName);
    let contests;

    if (platformName) {
      contests = await Contest.find({ platformName });
    } else {
      contests = await Contest.find();
    }

    res.status(200).json(contests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/find/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const contests = await Contest.find({ userId });
console.log(contests);
    res.status(200).json(contests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Contest.findByIdAndDelete(id);
    res.status(200).json({ message: 'Contest deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:contestId', async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.contestId);
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    res.status(200).json(contest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/edit/:contestId', async (req, res) => {
  try {
    const { contestId } = req.params;
    const updatedDetails = req.body; // Assuming the updated details are passed in the request body

    const contest = await Contest.findByIdAndUpdate(contestId, updatedDetails, { new: true });

    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }

    res.status(200).json({ message: 'Contest updated successfully', contest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
