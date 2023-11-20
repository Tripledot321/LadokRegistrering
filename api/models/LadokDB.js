const mongoose = require('mongoose');

ladokStudentResultSchema = new mongoose.Schema({
    _id: { type: String, alias: 'Personnummer'},
    courseCode: String,
    module: String,
    date: Date,
    Grade: String,
});

const LadokStudentResult = new mongoose.model('LadokStudentResult', ladokStudentResultSchema);

module.exports = LadokStudentResult;