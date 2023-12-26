const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  batch_no: String,
  course_name: String,
  roll_no: String,
  semester: Number,
  grade: String,
});

const Student = mongoose.model('Student', studentSchema, 'students');

module.exports = Student;
