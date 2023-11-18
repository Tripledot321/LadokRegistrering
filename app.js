const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user123:4KnNlLNdbNcnRnCR@cluster0.sdivnpi.mongodb.net/', {
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

module.exports = app;