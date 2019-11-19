var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var ServerIO = require('../Server/server');

const mongoose = require('mongoose');

// CORS SETTINGS
const cors = require('cors');

var whitelist = ['http://192.168.1.48:8081', 'http://192.168/1/48:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//================================

var indexRouter = require('./api/routes/index');
var usersRouter = require('./api/routes/users');

mongoose.connect('mongodb+srv://marcin:' +
process.env.MONGO_ATLAS_PW +
'@nodejs-jamoh.mongodb.net/test?retryWrites=true&w=majority',
{
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;
var app = express();
app.use(cors(corsOptions));

//SOCKET.IO

var io = require('socket.io')(ServerIO.server);
io.set('origins', '*:*');

io.on('connection', function(socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
    console.log(socket.id);
  });
});

//========== */


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
