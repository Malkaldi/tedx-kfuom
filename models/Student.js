const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    student_number: { type: String, required: true, unique: true },
    student_name: String,
    status: String
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
