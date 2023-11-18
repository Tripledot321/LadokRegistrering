const mongoose = require('mongoose');

// Course Assignments
const assignmentSchema = new mongoose.Schema({
    title: String,
    grade: String,
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
});

//Courses
const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        unique: true,
    },
});

//Student Course grades
const canvasStudentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    studentId: String,
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

const Assignment = mongoose.model('Assignment', assignmentSchema);
const Course = mongoose.model('Course', courseSchema);
const CanvasStudent = mongoose.model('CanvasStudent', canvasStudentSchema);

module.exports = { Assignment, Course, CanvasStudent };