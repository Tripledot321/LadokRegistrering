const mongoose = require('mongoose');

// Module Schema
const moduleSchema = new mongoose.Schema({
    title: String,
    grade: String,
    date: String,
});

// Course Schema
const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        unique: true,
    },
    modules: [moduleSchema],
});

// Student Grade Schema
const ladokStudentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    personNummer: Number,
    courses: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
            },
            grades: [String],
        },
    ],
});

const Module = mongoose.model('Module', moduleSchema);
const Course = mongoose.model('Course', courseSchema);
const Student = mongoose.model('Student', ladokStudentSchema);

module.exports = { Module, Course, Student };