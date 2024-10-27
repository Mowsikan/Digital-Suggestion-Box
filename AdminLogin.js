// src/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import './AdminLogin.css'; // For styling

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', { username, password });
            if (response.data.success) {
                window.location.href = '/admin-dashboard';
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            setError('Error logging in');
        }
    };

    return (
        <div className="admin-login">
             <img src="collegeLogo.png" alt="college-logo" className="admin-college-logo"/>
            <h2>Admin Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
