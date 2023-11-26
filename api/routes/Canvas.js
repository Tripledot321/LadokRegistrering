const express = require('express');
const router = express.Router();
const { CanvasStudentResult, Assignment } = require('../models/CanvasDB');

router.get('/get_StudentResult', async (req, res) => {
  try {
    const studentId = req.query.studentId;
    console.log('Input studentId:', studentId);

    // query db for student results
    const studentResults = await CanvasStudentResult.find({ studentId })
      .populate({
        path: 'courseId',
        select: 'courseName',
      })
      .populate({
        path: 'grades',
        populate: {
          path: 'assignment',
        },
      });

    if (!studentResults || studentResults.length === 0) {
      return res.status(404).json({
        message: 'Inga resultat för valt studentID.',
      });
    }

    // response
    const formattedResults = studentResults.map(result => ({
      CourseCode: result.courseId && result.courseId._id,
      AssignmentID: result.grades.map(assignment => ({
        _id: assignment.assignment && assignment.assignment._id,
        assignment: assignment.grades && assignment.grades,
      })),
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
