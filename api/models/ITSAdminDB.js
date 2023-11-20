const mongoose = require('mongoose');

itsStudentSchema = new mongoose.Schema({
    _id: { type: String, alias: 'StudentId' },
    personnummer: String,
});

const ItsStudent = mongoose.model('ItsStudent', itsStudentSchema);

module.exports = 'ItsStudent';