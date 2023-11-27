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
    assignments: [{ type: String, ref: 'Assignment', alias: 'assignmentId' }],
  });

// Assignments
const assignmentSchema = new mongoose.Schema({
    _id: { type: String, alias: 'assignmentId' },
    assignment: String,
    courseId: { type: String, ref: 'CanvasCourse' },
  });

// CanvasStudentResult
const canvasStudentResultSchema = new mongoose.Schema({
    studentId: {
        type: String,
        ref: 'CanvasStudent',
    },
    courseId: {
        type: String,
        ref: 'CanvasCourse',
    },
    grades: [{
        assignmentId: {
            type: String,
            ref: 'Assignment',
        },
        grade: String,
    }],
});

const CanvasStudent = mongoose.model('CanvasStudent', canvasStudentSchema);
const CanvasCourse = mongoose.model('CanvasCourse', canvasCourseSchema);
const Assignment = mongoose.model('Assignment', assignmentSchema);
const CanvasStudentResult = mongoose.model('CanvasStudentResult', canvasStudentResultSchema);

module.exports = { CanvasStudent, CanvasCourse, Assignment, CanvasStudentResult };