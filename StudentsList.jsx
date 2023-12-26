// src/components/StudentsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form } from 'react-bootstrap';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [batch_no, setBatchNo] = useState('');
  const [course_name, setCourseName] = useState('');
  const [roll_no, setRollNo] = useState('');
  const [semester, setSemester] = useState('');
  const [grade, setGrade] = useState('');
  const [flag, setFlag] = useState(false);

  const handleAddStudent = () => {
    const newStudent = {
      name: name,
      batch_no: batch_no,
      course_name: course_name,
      roll_no: roll_no,
      semester: semester,
      grade: grade
    };

    console.log('Add student:', newStudent);
    axios.post('http://localhost:3000/students/add', newStudent)
      .then(response => {
        console.log('Student added successfully:', response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3000/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleUpdate = (studentId, name, semester, batch_no, course_name, roll_no, grade) => {
    console.log(`Update student with ID: ${studentId}, ${name}, ${batch_no}, ${course_name}, ${roll_no}, ${grade}`);
    const updatedStudent = {
      name: name,
      batch_no: batch_no,
      course_name: course_name,
      roll_no: roll_no,
      grade: grade,
      semester: semester
    };
    console.log('Update student:', updatedStudent);
    setId(studentId);
    setName(name);
    setBatchNo(batch_no);
    setCourseName(course_name);
    setRollNo(roll_no);
    setGrade(grade);
    setSemester(semester);
    setFlag(true);
  };

  const updateStudent = () => {
    const updatedStudent = {
      name: name,
      batch_no: batch_no,
      course_name: course_name,
      roll_no: roll_no,
      grade: grade,
      semester: semester
    };
    console.log('Update student:', updatedStudent);
    axios.put(`http://localhost:3000/students/update/${id}`, updatedStudent)
      .then(response => {
        console.log('Student updated successfully:', response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating student:', error);
      });
    setFlag(false);
  };

  const handleDelete = async (studentId) => {
    console.log(`Delete student with ID: ${studentId}`);
    const response = await axios.delete(`http://localhost:3000/students/delete/${studentId}`);
    console.log(response);
    window.location.reload();
  };

  return (
    <Container>
      <h1 className="mt-4 mb-4">Students List</h1>
      {students.map(student => (
        <div key={student._id}>
          <Card className="mb-3" style={{ boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)', padding: 20, borderRadius: 10 }}>
            <Card.Body>
              <Card.Title>{student.name}</Card.Title>
              <Card.Text>
                Batch: {student.batch_no}, Course: {student.course_name}, Roll No: {student.roll_no}, Grade: {student.grade}
              </Card.Text>
              <Card.Text>
                Semester: {student.semester}
              </Card.Text>

              <Button variant="primary" onClick={() => handleUpdate(student._id, student.name, student.semester, student.batch_no, student.course_name, student.roll_no, student.grade)}>Update</Button>{' '}
              <Button variant="danger" onClick={() => handleDelete(student._id)}>Delete</Button>


            </Card.Body>

          </Card>
          <br/>
        </div>
      ))}

      {!flag ? <h1 className="mb-4">Add Student</h1> : <h1 className="mb-4">Update Student</h1>}
      <Form style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', padding: 20, borderRadius: 10}}>
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
        <br />
        {!flag ? <Button variant="primary" onClick={handleAddStudent}>Add Student</Button> : <div><Button variant="primary" onClick={updateStudent}>Update Student</Button> <Button variant='danger' onClick={() => { setFlag(false); setBatchNo(''); setCourseName(''); setGrade(''); setId(''); setRollNo(''); setSemester(''); setName('') }}>Cancel</Button></div>}
      </Form>
      <br></br>
    </Container>
    
  );
};

export default StudentsList;
