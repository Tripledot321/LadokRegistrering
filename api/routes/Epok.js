const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { EpokCourse, EpokModule } = require('../models/EpokDB');

router.get('/get_Module', async (req, res) => {
  try {
    const courseCode = req.query.courseCode;
    console.log('Input courseCode:', courseCode);

    // query db for course
    const epokCourse = await EpokCourse.findOne({ _id: courseCode }).populate('moduleIds');

    if (!epokCourse) {
      return res.status(404).json({
        message: 'Kursen finns ej.',
      });
    }

    // query db for modules
    const activeModules = epokCourse.moduleIds?.map(module => ({
      Code: module._id,
      Description: module.moduleName,
    }));

    // respond with modules
    res.status(200).json({
      courseCode: epokCourse._id,
      activeModules: activeModules,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        error: 'Felaktig kurskod',
      });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;