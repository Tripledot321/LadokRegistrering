const express = require('express');
const router = express.Router();
const { EpokCourse, EpokModule } = require('../models/EpokDB');

router.get('/get_Module', async (req, res) => {
  try {
    // Get the course code from the request query parameter
    // const courseCode = req.query.courseCode;

    const courseCode = "d0031n";

    // Find the EpokCourse based on the course code
    const epokCourse = await EpokCourse.findOne({ _id: courseCode }).populate('moduleIds');

    if (!epokCourse) {
      return res.status(404).json({
        message: 'No active modules found for the provided course code.',
      });
    }

    // Extract module information from the populated 'moduleIds' field
    const activeModules = epokCourse.moduleIds.map(module => ({
      Code: module._id,
      Description: module.moduleName,
    }));

    // Send the active modules in the response
    res.status(200).json({
      courseCode: epokCourse._id,
      activeModules: activeModules,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
