// src/components/StudentsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form } from 'react-bootstrap';

const StudentsList = () => {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState('');
  const [batch_no, setBatchNo] = useState('');
  const [course_name, setCourseName] = useState('');
  const [roll_no, setRollNo] = useState('');
  const [semester, setSemester] = useState('');
  const [grade, setGrade] = useState('');

  const handleAddStudent = () => {
    // Implement the logic for adding a new student
    const newStudent = {
      name: name,
      batch_no: batch_no,
      course_name: course_name,
      roll_no: roll_no,
      semester: semester,
      grade: grade
    };

    console.log('Add student:', newStudent);
    // Send a POST request to add the new student
    axios.post('http://localhost:3000/students/add', newStudent)
      .then(response => {
        console.log('Student added successfully:', response.data);
        // Redirect back to the students list page
        // You can use react-router-dom's useHistory here
        // Or any other navigation method you prefer
        window.location.reload();
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  };

  useEffect(() => {
    // Fetch students data from the API
    axios.get('http://localhost:3000/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleUpdate = (studentId) => {
    // Implement the logic for updating a student
    console.log(`Update student with ID: ${studentId}`);

  };

  const handleDelete = async (studentId) => {
    // Implement the logic for deleting a student
    console.log(`Delete student with ID: ${studentId}`);
    const response = await axios.delete(`http://localhost:3000/students/delete/${studentId}`);
    console.log(response);
    window.location.reload();

  };

  return (
    <Container>
      <h1 className="mt-4 mb-4">Students List</h1>
      {students.map(student => (
        <Card key={student._id} className="mb-3" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <Card.Body>
            <Card.Title>{student.name}</Card.Title>
            <Card.Text>
              Batch: {student.batch_no}, Course: {student.course_name}, Roll No: {student.roll_no}, Grade: {student.grade}
            </Card.Text>
            <Button variant="primary" onClick={() => handleUpdate(student._id)}>Update</Button>{' '}
            <Button variant="danger" onClick={() => handleDelete(student._id)}>Delete</Button>
          </Card.Body>
        </Card>
      ))}

      <h1 className="mb-4">Add Student</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Batch No</Form.Label>
          <Form.Control type="text" name="batch_no" value={batch_no} onChange={(e) => setBatchNo(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Course Name</Form.Label>
          <Form.Control type="text" name="course_name" value={course_name} onChange={(e) => setCourseName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Roll No</Form.Label>
          <Form.Control type="text" name="roll_no" value={roll_no} onChange={(e) => setRollNo(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Semester</Form.Label>
          <Form.Control type="number" name="semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Grade</Form.Label>
          <Form.Control type="text" name="grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={handleAddStudent}>Add Student</Button>
      </Form>
    </Container>
  );
};

export default StudentsList;
