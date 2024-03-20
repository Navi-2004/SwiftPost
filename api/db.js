// OAR0doimgAXlAoqj
// mongodb+srv://navisenthilnadhan:<password>@cluster0.0i3cbvl.mongodb.net/
const mongoose = require('mongoose');

const SoftSkills = require('./models/SoftSkills'); // Replace this with the correct path to your model file

// MongoDB connection URI
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Export mongoose to use in other parts of your application
module.exports = mongoose;
