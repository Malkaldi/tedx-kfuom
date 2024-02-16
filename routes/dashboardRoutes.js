// dashboardRoutes.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/overall-attendance', async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const studentsAttended = await Student.countDocuments({ presence: true });

        res.json({
            studentsAttended: studentsAttended,
            studentsNotAttended: totalStudents - studentsAttended
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching overall attendance data', error: error.message });
    }
});

router.get('/program-attendance', async (req, res) => {
    try {
        const programAttendance = await Student.aggregate([
            { $match: { presence: true } },
            { $group: { 
                _id: "$program",
                attended: { $sum: 1 },
                maxAttendance: { $max: "$max" },
            }},
            { $project: { 
                program: "$_id", 
                _id: 0, 
                attended: 1, 
                maxAttendance: 1, 
            }}
        ]);

        res.json(programAttendance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching program-specific attendance data', error: error.message });
    }
});

module.exports = router;
