// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuggestionForm from './SuggestionForm';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SuggestionForm />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
