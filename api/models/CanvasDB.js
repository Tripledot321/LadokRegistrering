const mongoose = require('mongoose');

const canvasSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('CanvasStudent', canvasSchema);