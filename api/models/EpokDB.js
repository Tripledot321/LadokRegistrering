const mongoose = require('mongoose');

const epokCourseSchema = new mongoose.Schema({
  _id: { type: String, alias: 'courseId' },
  courseName: String,
  moduleIds: [{
    type: String,
    ref: 'EpokModule'
  }],
}, { default: { moduleIds: [] } });

const epokModuleSchema = new mongoose.Schema({
  _id: { type: String, alias: 'moduleId' },
  moduleName: String,
});

const EpokCourse = mongoose.model('EpokCourse', epokCourseSchema);
const EpokModule = mongoose.model('EpokModule', epokModuleSchema);

module.exports = { EpokCourse, EpokModule };
