// modules =================================================
var express = require('express');
var mongoose = require('mongoose');
var app = express();


// config files
var config = require('./config/db');

// configuration ===========================================
var db = mongoose.connect(config.url);

app.use(express.static(__dirname + '/public')); 


// routes ==================================================
app.use('/', require('./routes/index'));
app.use('/tea', require('./routes/tea'));

// start app ===============================================
var port = process.env.PORT || 8080; 
app.listen(port);

// expose app           
exports = module.exports = app;