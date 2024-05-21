import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Search from './pages/search';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route path="/search" element={<Search />} />
        </Routes>
    </Router>
  )
}
export default App