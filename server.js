const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./database');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '/'))); 

// API Routes
app.post('/api/book', (req, res) => {
    const { name, email, phone, service, message } = req.body;
    
    if(!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    const sql = `INSERT INTO appointments (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)`;
    const params = [name, email, phone, service, message || ''];
    
    db.run(sql, params, async function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        // Send data to Google Sheets
        const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbzsavJddKBRjUqeloCEzxYVnKOWVk5tRAgd77sdenUSwrM5MRHyvyKYRqarnmjc2jqT/exec';
        try {
            await axios.post(googleAppsScriptUrl, { name, email, phone, service, message });
        } catch (scriptErr) {
            console.error('Error saving to Google Sheets:', scriptErr.message);
        }

        res.json({ message: 'Appointment booked successfully', id: this.lastID });
    });
});

app.get('/api/appointments', (req, res) => {
    const sql = `SELECT * FROM appointments ORDER BY createdAt DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Admin dashboard at http://localhost:${PORT}/admin.html`);
});
