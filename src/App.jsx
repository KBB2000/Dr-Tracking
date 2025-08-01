import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import DoctorProfile from './pages/DoctorProfile';
import BookAppointment from './pages/BookAppointment';
import './styles.css';

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Router>
      <div className="app">
        <header className="navbar">
          <NavLink to="/" className="logo">NirogGyan</NavLink>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/book/:id" element={<BookAppointment />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
