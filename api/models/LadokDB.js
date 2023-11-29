const mongoose = require('mongoose');

ladokStudentResultSchema = new mongoose.Schema({
    personnummer: String,
    courseCode: String,
    module: String,
    date: Date,
    grade: String,
});

const LadokStudentResult = mongoose.model('LadokStudentResult', ladokStudentResultSchema);

module.exports = LadokStudentResult;