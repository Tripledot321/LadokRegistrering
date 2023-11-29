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

// list students by course code and assignment
router.get('/getStudents/:courseCode/:assignmentIds', async (req, res) => {
  try {
      const { courseCode, assignmentIds } = req.params;
      const assignmentIdArray = assignmentIds.split(',');
      // find course by course code
      const course = await CanvasCourse.findOne({ courseId: courseCode }).populate('assignments');
      if (!course) {
        return res.status(404).json({ error: 'kurs finns ej' });
      }
      // find assignment by assignment name
      const assignment = await Assignment.findOne({ assignment: assignmentName, courseId: courseCode });

      if (!assignment) {
        return res.status(404).json({ error: 'uppgift finns ej' });
      }
      // find student result for the selected course and assignment
      const studentResults = await CanvasStudentResult.find({
        courseId: courseCode,
        'grades.assignmentId': { $in: assignmentIdArray },
    }).populate('studentId');
      // prepare response
      const result = studentResults.map((result) => {
          const studentName = result.studentId.name;
          const canvasGrade = result.grades.find((grade) => grade.assignmentId.equals(assignment._id))?.grade || '';
          const ladokGrade = 'Placeholder Textfield'; 
          const examinationDate = 'Placeholder Date'; 
          const status = 'Placeholder Label';
          const information = 'Placeholder Label'; 

          return {
              'Namn': studentName,
              'Omdöme i Canvas': canvasGrade,
              'Betyg i Ladok': ladokGrade,
              'Examinationsdatum': examinationDate,
              'Status': status,
              'Information': information,
          };
      });

      res.json(result);
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