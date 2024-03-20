const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User'); // Import the User model

router.post('/signup', async (req, res) => {
  console.log("req.body",req.body)
  const { name,email, phoneNumber, password } = req.body;
  console.log("Server Side for signup");

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save();
    console.log("New user saved");

    res.status(201).json({ message: 'User signed up successfully', user: newUser });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  let { email, password } = req.body;
  email=email.trim();
  password=password.trim();
  console.log("Server Side for login");

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

module.exports = router;
