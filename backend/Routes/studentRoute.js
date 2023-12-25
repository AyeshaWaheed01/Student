const express = require('express');
const router = express.Router();

const Student = require('../Model/studentModel');

router.get('/', async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/add', async (req, res) => {
    try {
      const { name, batch_no, course_name, roll_no, semester, grade } = req.body;
  
      // Validate required fields
      if (!name || !batch_no || !course_name || !roll_no || !semester || !grade) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const newStudent = new Student({
        name,
        batch_no,
        course_name,
        roll_no,
        semester,
        grade,
      });
  
      await newStudent.save();
  
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.put('/students/:id', async (req, res) => {
    try {
      const studentId = req.params.id;
      const { name, batch_no, course_name, roll_no, semester, grade } = req.body;
  
      // Validate required fields
      if (!name || !batch_no || !course_name || !roll_no || !semester || !grade) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        {
          name,
          batch_no,
          course_name,
          roll_no,
          semester,
          grade,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json(updatedStudent);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router