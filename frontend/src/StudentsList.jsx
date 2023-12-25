// src/components/StudentsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students data from the API
    axios.get('http://localhost:3000/students/')
      .then(response => {
        console.log(students)
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  return (
    <div>
      <h1>Students List</h1>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            <strong>{student.name}</strong> - Batch: {student.batch_no}, Course: {student.course_name}, Roll No: {student.roll_no}, Grade: {student.grade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsList;
