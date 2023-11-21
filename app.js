const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://user123:4KnNlLNdbNcnRnCR@cluster0.sdivnpi.mongodb.net/', {});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// route handler
app.get('/', (req, res) => {
  res.send('this is the application root');
});

const epokRouter = require('./api/routes/Epok');
app.use('/epok', epokRouter);

module.exports = app;
