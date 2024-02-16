const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: process.env.SERVER
}));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files


// Route to serve the attendance page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attendance.html'));
});

// Route to serve the dashboard page
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

const attendanceRoutes = require('./routes/attendanceRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');



// Use the defined routes
app.use('/api/attendance', attendanceRoutes);
app.use('/api/dashboard', dashboardRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.set('debug', true);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
