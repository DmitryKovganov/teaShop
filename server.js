// modules =================================================
var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/teadb');

// config files
// var db = require('./config/db');

var app = express();

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 


// routes ==================================================
app.use('/', require('./routes/index'));
app.use('/nerd', require('./routes/nerd'));


// start app ===============================================
var port = process.env.PORT || 8080; 
app.listen(port);

// expose app           
exports = module.exports = app;