const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

async function connectToDatabase() {
  try {
mongoose.connect('mongodb+srv://test123:FVJq7wW4AKEcw7Bc@cluster0.sdivnpi.mongodb.net/', {});
console.log('Connected to database');
} catch (error) {
  console.error('Connection error:', error);
}
}
connectToDatabase();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// route handler
app.get('/', (req, res) => {
  res.send('this is the application root');
});

const epokRouter = require('./api/routes/Epok');
app.use('/epok', epokRouter);

const itsRouter = require('./api/routes/ITSAdmin');
app.use('/ITSAdmin', itsRouter);

const canvasRouter = require('./api/routes/Canvas');
app.use('/canvas', canvasRouter);

module.exports = app;