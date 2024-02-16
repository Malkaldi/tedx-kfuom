const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.post("/mark-attendance", async (req, res) => {
    const { student_number } = req.body;
    const regex = /^05\d{8}$/;

    if (!regex.test(student_number)) {
        return res.json({
            type: "error",
            message: "Invalid ID, make sure it starts with 05 followed by 8 digits.",
        });
    }

    try {
        const student = await Student.findOne({ student_number: student_number });
        if (student) {
            if (student.status !== 'Attended') {
                student.status = 'Attended';
                await student.save();
                res.status(200).json({
                    type: "success",
                    message: "Your attendance has been marked as Attended.",
                    status: student.status,
                });
            } else {
                res.status(200).json({
                    type: "info",
                    message: "You have already been marked as Attended.",
                    status: student.status,
                });
            }
        } else {
            res.json({
                type: "not-registered",
                message: "You are not in the database.",
                status: "Not in the Database",
            });
        }
    } catch (error) {
        res.json({ message: "Error marking attendance", error: error.message });
    }
});

module.exports = router;
