const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ItsStudent = require('../models/ITSAdminDB');

router.get('/get_PNR', async (req, res) => {
    try {
        const itsStudentId = req.query.ItsStudentId;
        console.log('Student ID:', itsStudentId);

        const itsStudent = await ItsStudent.findOne({ _id: itsStudentId });
        
        if (!itsStudent) {
            return res.status(404).json({
                message: 'Student hittas inte.',
            });
        }

        res.status(200).json({
            studentId: itsStudent._id,
            personnummer: itsStudent.personnummer,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                error: 'Invalid student ID format',
            });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;