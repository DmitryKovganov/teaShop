var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public')); 

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(8080);
console.log("App listening on port 8080");