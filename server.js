require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/seleniteVastu';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Appointment Schema & Model
const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: '' },
    service: { type: String },
    message: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Define Review Schema & Model
const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '/'))); 

// API Routes
app.post('/api/book', async (req, res) => {
    const { name, email, phone, address, service, message } = req.body;
    
    if(!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    try {
        const newAppointment = new Appointment({
            name, email, phone, address, service, message
        });

        // Save to MongoDB Database
        const savedAppointment = await newAppointment.save();
        
        // Send data to Google Sheets
        const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbzsavJddKBRjUqeloCEzxYVnKOWVk5tRAgd77sdenUSwrM5MRHyvyKYRqarnmjc2jqT/exec';
        try {
            await axios.post(googleAppsScriptUrl, newAppointment.toObject());
        } catch (scriptErr) {
            console.error('Error saving to Google Sheets:', scriptErr.message);
        }

        res.json({ message: 'Appointment booked successfully', id: savedAppointment._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/appointments', async (req, res) => {
    try {
        // Fetch all appointments sorted by newest first
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read appointments' });
    }
});

app.post('/api/review', async (req, res) => {
    const { name, rating, message } = req.body;
    
    if(!name || !rating || !message) {
        return res.status(400).json({ error: 'Name, rating, and message are required.' });
    }

    try {
        const newReview = new Review({ name, rating, message });
        await newReview.save();
        res.json({ message: 'Review submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Admin dashboard at http://localhost:${PORT}/admin.html`);
});
