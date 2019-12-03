const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const secret = 'secret';
const express = require('express');

module.exports = (app) => {
    app.use(express.json({limit: '10mb'}));
    app.use(express.urlencoded({limit: '10mb'}));
    app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
    app.use(cors());
    app.use(cookieParser(secret));
};