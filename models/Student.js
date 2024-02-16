const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    name: String,
    mobile: Number,
    shirt: String,
    program: String,
    lead: String,
    leadNo: Number,
    presence: { type: Boolean, default: false }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
