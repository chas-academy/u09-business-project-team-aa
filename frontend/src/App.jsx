import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/global.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const saveToken = (t) => {
       setToken(t);
        localStorage.setItem('token', t);
      };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes token ={token} />} />
                <Route path="/profile" element={<Profile token={token} />} />
                <Route path="/login" element={<Login setToken={saveToken} />} />
                <Route path="/register" element={<Register setToken={saveToken} />} />
            </Routes>
        </Router>
    );
}

export default App;
                