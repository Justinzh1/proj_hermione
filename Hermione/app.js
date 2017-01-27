var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
require('./config/passport')(passport);

var morgan = require('morgan');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var students = require('./routes/students');
var classes = require('./routes/classes');

var db = mongoose.connect('mongodb://localhost/users');
var classesObj = require('./model/class')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(__dirname + '/images'));

app.use(session({ secret: "kittens mittens" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/students', students);
app.use('/classes', classes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.render('error');
  res.status(err.status || 500, 'render');
});


module.exports = app;
