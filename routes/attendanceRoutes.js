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
          status: "Attended",
        });
      } else {
        res.status(200).json({
          type: "warning",
          message: "You have already been marked as Attended.",
          status: "Already Attended", // Use a distinct status for this case
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

// In attendanceRoutes.js or a new file for dashboard related routes

router.get("/dashboard-data", async (req, res) => {
  try {
      const malesAttended = await Student.countDocuments({ gender: 'Male', status: 'Attended' });
      const femalesAttended = await Student.countDocuments({ gender: 'Female', status: 'Attended' });

      res.json({
          malesAttended,
          femalesAttended
      });
  } catch (error) {
      res.status(500).json({ message: "Error fetching dashboard data", error: error.message });
  }
});

module.exports = router;
