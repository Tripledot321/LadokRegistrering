const express = require('express');
const router = express.Router();
const { CanvasStudentResult } = require('../models/CanvasDB');

router.get('/get_StudentResult', async (req, res) => {
  try {
    const studentId = req.query.studentId;
    console.log('Input studentId:', studentId);

    // query the database to get student results
    const studentResults = await CanvasStudentResult.find({ studentId })
      .populate('courseId', 'courseName')
      .populate('assignmentIds', 'assignment');

    if (!studentResults || studentResults.length === 0) {
      return res.status(404).json({
        message: 'Inga resultat för valt studentID.',
      });
    }

    // respond with student results
    const formattedResults = studentResults.map(result => ({
      CourseCode: result.courseId._id,
      AssignmentID: result.assignmentIds.map(assignment => assignment._id),
      Grade: result.Grade,
    }));

    res.status(200).json({
      studentId,
      studentResults: formattedResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
