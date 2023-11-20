const mongoose = require('mongoose');

// CanvasStudent
const canvasStudentSchema = new mongoose.Schema({
    _id: { type: String, alias: 'studentId' },
    name: String,
});

// CanvasCourse
const canvasCourseSchema = new mongoose.Schema({
    _id: { type: String, alias: 'courseId' },
    courseName: String,
    assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
    }],
});

// Assignments
const assignmentSchema = new mongoose.Schema({
    _id: { type: String, alias: 'assignmentId' },
    assignment: String,
});

// CanvasStudentResult
const canvasStudentResultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CanvasStudent',
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CanvasCourse',
    },
    assignmentIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
    }],
    Grade: String,
})

const CanvasStudent = mongoose.model('CanvasStudent', canvasStudentSchema);
const CanvasCourse = mongoose.model('CanvasCourse', canvasCourseSchema);
const Assignment = mongoose.model('Assignment', assignmentSchema);
const CanvasStudentResult = mongoose.model('CanvasStudentResult', canvasStudentResultSchema);

module.exports = { CanvasStudent, CanvasCourse, Assignment, CanvasStudentResult };