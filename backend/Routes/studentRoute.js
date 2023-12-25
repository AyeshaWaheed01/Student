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

module.exports = router