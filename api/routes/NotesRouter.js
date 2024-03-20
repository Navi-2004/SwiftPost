const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');   

const Note=require('../models/Note');
router.post('/create', async (req, res) => {
    try {
      const { title, description, category, reminderFrequency,userId } = req.body;
      const newNote = new Note({
        title,   
        description,
        category,
        reminderFrequency,
        userId,
      });
      const savedNote = await newNote.save();
      res.status(201).json(savedNote);
    } catch (error) {
      console.error('Error saving note:', error);
      res.status(500).json({ error: 'Failed to save note' });
    }
  });
  router.get('/getAll', async (req, res) => {
    try {
      const userId = req.query.userId;
      let notes=await Note.find({userId});
    console.log('Notes:', notes);
    //   const notes = await Note.find(filter);
      res.status(200).json(notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      res.status(500).json({ error: 'Failed to fetch notes' });
    }
  });

  router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the note by ID and delete it
      const deletedNote = await Note.findByIdAndDelete(id);
      
      if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      
      res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/get/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const note = await Note.findById(id);
  
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
        res.status(200).json(note);
    } catch (error) {
      console.error('Error fetching note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedNoteData = req.body;
  
      // Find the note by ID and update it with the new data
      const updatedNote = await Note.findByIdAndUpdate(id, updatedNoteData, { new: true });
  
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      res.status(200).json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
    
  


module.exports=router;