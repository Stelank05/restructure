require('dotenv').config();

const express = require('express');

const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

// Setup Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(result => {
        console.log("Connected to MongoDB Database");
    })
    .catch(err => console.log("MongoDB Connection Error:", err));

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './pages');
app.set('view engine', 'ejs');

// Routers
const homeRouter = require('./routes/homeRouter_New');
const formulaOneRouter = require('./routes/formulaOneRouter');
const wecRouter = require('./routes/wecRouter');
const imsaRouter = require('./routes/imsaRouter');
const allRouter = require('./routes/displayAllRouter');

app.use(homeRouter);
app.use(formulaOneRouter);
app.use(wecRouter);
app.use(imsaRouter);
app.use(allRouter);

app.use(express.static(__dirname));
app.use('/designs', express.static(__dirname));
app.use('/scripts', express.static(__dirname));

module.exports = app;