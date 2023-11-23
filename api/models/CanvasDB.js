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
    // Hade problem att skriva till databasen med objekt. Ändrade till string för att få det att funka
    /*assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
    }],*/
    assignments: [{ type: String, alias: 'assignmentId' }],
});

// Assignments
const assignmentSchema = new mongoose.Schema({
    _id: { type: String, alias: 'assignmentId' },
    assignment: String,
    date: String,
});

// CanvasStudentResult
const canvasStudentResultSchema = new mongoose.Schema({
    // Hade problem att skriva till databasen med objekt. Ändrade till string för att få det att funka
    /*studentId: {
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
    }],*/
    studentId: String, 
    courseId: String, 
    assignmentIds: [{ type: String, alias: 'assignmentId' }],
    Grade: String,
})

const CanvasStudent = mongoose.model('CanvasStudent', canvasStudentSchema);
const CanvasCourse = mongoose.model('CanvasCourse', canvasCourseSchema);
const Assignment = mongoose.model('Assignment', assignmentSchema);
const CanvasStudentResult = mongoose.model('CanvasStudentResult', canvasStudentResultSchema);

module.exports = { CanvasStudent, CanvasCourse, Assignment, CanvasStudentResult };