// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');
const cron = require('node-cron');
const nodemailer = require('nodemailer'); 
const User = require('./models/User');



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



// Middleware
app.use(cors());
app.use(express.json());

async function getUsersFromDatabase() {
  try {
    const users = await User.find({}, 'email');
    // console.log(users);
    return users.map(user => user.email);
  } catch (error) {
    console.error('Error retrieving users from the database:', error);
    return []; // Return an empty array if there's an error
  }
}


const transporter = nodemailer.createTransport({
  pool : true,
  service:"hotmail",
  auth: {  
      user: process.env.EMAIL_USERNAME, 
      pass: process.env.EMAIL_PASSWORD 
  }
});
cron.schedule('0 8 * * 3', () => { // Wednesday 8 am (0 8 * * 3)
  sendEmailToUsers('Wednesday'); // Function to send emails to users
  console.log('Scheduled email sent to users on Wednesday at 8 am.');
});

cron.schedule('0 8 * * 7', () => { // Monday 8 am (0 8 * * 1)
  sendEmailToUsers('Monday'); // Function to send emails to users
  console.log('Scheduled email sent to users on Monday at 8 am.');
});

cron.schedule('0 20 * * 6', () => { // Saturday 8 pm (0 20 * * 6)
  sendEmailToUsers('Saturday'); // Function to send emails to users
  console.log('Scheduled email sent to users on Saturday at 8 pm.');
});


cron.schedule('24 18 * * 2', () => { // Everyday at 6:06 PM in IST
  sendEmailToUsers('Test'); // Function to send test emails
  console.log('Test email scheduled to be sent at 6:06 PM in IST.');
});

// Function to send emails to us   ers
// function sendEmailToUsers(day) {
//   // Email message options
//   const mailOptions = {
//     from: process.env.EMAIL_USERNAME, // Sender address
//     to: 'navipriyas.cse2021@citchennai.net', // Recipient address (replace with actual email)
//     subject: `Gentle Reminder: Coding Contest on ${day}`, // Email subject
//     text: `Dear Participant,\n\nWe hope this email finds you well. We would like to remind you about the coding contest scheduled for ${day} at 8:00 AM. We encourage you to participate and showcase your skills.\n\nAll the best and happy coding!\n\nBest regards,\nYour Coding Contest Team` // Email body
// };

//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           console.error('Error sending email:', error);
//       } else {
//           console.log('Email sent:', info.response);
//       }
//   });
// }


 async function  sendEmailToUsers(day) {
  
  const users = await getUsersFromDatabase();
  console.log(users);
if(users.length!=0){

  users.forEach(user => {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email, 
      subject: `Gentle Reminder: Coding Contest on ${day}`,
      text: `Dear ${user.name || 'Participant'},\n\nWe hope this email finds you well. We would like to remind you about the coding contest scheduled for ${day} at 8:00 AM. We encourage you to participate and showcase your skills.\n\nAll the best and happy coding!\n\nBest regards,\nYour Coding Contest Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent to', user.email);
      }
    });
  });
}
}

cron.schedule('0 10 * * 0', () => { // Every Sunday at 10:00 AM
  sendNotificationToUsers(); // Function to send notifications to users
  console.log('Notification sent to users to revise notes on Sunday at 10:00 AM.');
});

// Function to send notifications to users
function sendNotificationToUsers() {
  // Retrieve list of users and their email addresses from the database
  getUsersFromDatabase()
    .then(users => {
      // Iterate over the list of users
      users.forEach(user => {
        // Email message options
        const mailOptions = {
          from: process.env.EMAIL_USERNAME,
          to: user.email, // Use the email address of the current user
          subject: 'Reminder: Time to Revise Your Notes',
          text: `Dear ${user.name || 'User'},\n\nThis is a friendly reminder to take some time today to review your notes and reinforce your learning. We hope you find it helpful in your studies.\n\nBest regards,\nYour Notes App Team`
        };

         transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Notification sent to', user.email);
          }
        });
      });
    })
    .catch(error => {
      console.error('Error retrieving users from the database:', error);
    });
}



app.get('/send-test-email', (req, res) => {
  const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: 'navipriyas.cse2021@citchennai.net', 
      subject: 'Test Email',
      text: 'This is a test email sent using Nodemailer.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Error sending email');
      } else {
          console.log('Email sent:', info.response);
          res.send('Test email sent successfully');
      }
  });
});


app.get('/', (req, res) => {
  res.send('hello');
});
app.post('/' , (req,res) => {
  res.send('hello');
  console.log('hello');
});  
// Routes  
const userRouter = require('./routes/userRouter');
app.use('/user', userRouter);
const ContestRouter=require('./routes/ContestRouter');
app.use('/coding',ContestRouter);
const NotesRouter=require('./routes/NotesRouter');
app.use('/notes',NotesRouter);
const SkillsRouter=require('./routes/SkillsRouter');
app.use('/soft',SkillsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
