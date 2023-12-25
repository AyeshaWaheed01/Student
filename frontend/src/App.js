// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentsList from './StudentsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentsList />} /> {/* Use 'element' instead of 'component' */}
      </Routes>
    </Router>
  );
}

export default App;