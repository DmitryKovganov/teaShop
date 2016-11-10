// modules =================================================
var express = require('express');
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var mongoose = require('mongoose');
var app = express();


// configuration ===========================================
var config = require('./config/db');
var db = mongoose.connect(config.url);

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


// routes ==================================================
app.use('/', require('./app/routes/tea'));
// var path = require('path');
// app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));

// start app ===============================================
var port = process.env.PORT || 8080; 
app.listen(port);