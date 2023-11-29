const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const LadokStudentResult = require('../models/LadokDB');

router.post('/saveStudentResult', async (req, res) => {
    try {
        const { personnummer, courseCode, module, date, grade } = req.body;

        // Validate the incoming data
        if (!personnummer || !courseCode || !module || !date || !grade) {
            return res.status(400).json({ error: 'Incomplete data in the request body' });
        }

        // Additional validation if needed...

        // Create a new LadokStudentResult document
        const ladokStudentResult = new LadokStudentResult({
            personnummer: personnummer,
            courseCode: courseCode,
            module: module,
            date: date,
            grade: grade,
        });

        // Save the document to the database
        await ladokStudentResult.save();

        res.status(200).json({ message: 'LadokStudentResult saved successfully' });
    } catch (error) {
        console.error('Error saving LadokStudentResult:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;