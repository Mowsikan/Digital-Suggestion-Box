// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const multer = require('multer');
// Dummy admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Make sure you create this directory
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Admin login route
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

// Store suggestions in memory (for demonstration purposes)
let suggestions = [];

// Submit suggestion route
app.post('/api/suggestions/submit',upload.single('file'), (req, res) => {
    const { content, description } = req.body;
    const file = req.file;
    if (content && description) {
        const suggestion = { _id: suggestions.length + 1, content, description };
        suggestions.push(suggestion);
        res.json({ success: true, message: 'Suggestion received!' });
    } else {
        res.json({ success: false, message: 'Missing fields.' });
    }
});

// Get suggestions route (for Admin Dashboard)
app.get('/api/suggestions', (req, res) => {
    res.json(suggestions);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
