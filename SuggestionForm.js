// src/SuggestionForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './SuggestionForm.css';

const SuggestionForm = () => {
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', content);
        formData.append('description', description);
        if (file) formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/suggestions/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                setMessage('Suggestion submitted successfully!');
                setContent('');
                setDescription('');
                setFile(null);
            } else {
                setMessage('Error submitting suggestion');
            }
        } catch (error) {
            setMessage('Error submitting suggestion');
        }
    };

    return (
        <div className="form-container">
            <img src="collegeLogo.png" alt="college-logo" className="form-college-logo"/>
            <h2>Submit a Suggestion</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <input 
                    type="file" 
                    accept="image/*,video/*" 
                    onChange={handleFileChange} 
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SuggestionForm;
