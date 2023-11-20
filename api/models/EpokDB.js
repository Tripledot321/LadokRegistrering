const mongoose = require('mongoose');

epokCourseSchema = new mongoose.Schema({
    _id: { type: String, alias: 'courseId' },
    courseName: String,
    moduleIds: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EpokModule'
    },
});

epokModuleSchema = new mongoose.Schema({
    _id: { type: String, alias: 'moduleId' },
    moduleName: String,
});

const EpokCourse = mongoose.model('EpokCourse', epokCourseSchema);
const EpokModule = mongoose.model('EpokModule', epokModuleSchema);

module.exports = { EpokCourse, EpokModule };