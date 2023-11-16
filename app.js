const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products');

mongoose.connect('mongodb+srv://user123:4KnNlLNdbNcnRnCR@cluster0.sdivnpi.mongodb.net/', {
    useMongoClient: true
});

app.use('/products', productRoutes);

module.exports = app;