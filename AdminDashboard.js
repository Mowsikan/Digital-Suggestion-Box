// src/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // For styling

const AdminDashboard = () => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/suggestions');
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching suggestions');
            }
        };

        fetchSuggestions();
    }, []);

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <ul>
                {suggestions.map(s => (
                    <li key={s._id}>
                        <h4>{s.content}</h4>
                        <p>{s.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
