const express = require('express');
const router = express.Router();
const { CanvasStudent, CanvasCourse, Assignment, CanvasStudentResult } = require('../models/CanvasDB');

router.get('/get_Assignments', async (req, res) => {
  try {
    const courseCode = req.query.courseCode;
    console.log('Input CourseCode:', courseCode);

    const assignments = await Assignment.find({ courseId: courseCode });
    console.log('Assignments:', assignments);
    res.status(200).json({
      assignments: assignments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get_StudentList/', async (req, res) => {
  try {
    const courseCode = req.query.courseCode;
    console.log('Test CourseCode:', courseCode);

    // query db for students
    const students = await CanvasStudentResult.find({ courseId: courseCode });
    students.forEach(student => {
      console.log('Student ID:', student.studentId);
      console.log('Course ID:', student.courseId);
      console.log('Grades:', student.grades);
      console.log('-----------------------');
  });

  res.status(200).json(students);
} catch (error) {
  console.error('Error fetching student list:', error);
  res.status(500).send('Internal Server Error');
}
});
module.exports = router;