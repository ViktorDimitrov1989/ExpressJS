let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let fileUploader = require('express-fileupload');

let index = require('./routes/index');
let addMeme = require('./routes/addMeme');
let searchMemes = require('./routes/searchMemes');
let viewAllMemes = require('./routes/viewAllMemes');
let addGenre = require('./routes/addGenre');
let getMemeDetails = require('./routes/getMemeDetails');


let app = express();
require('./config/db');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/views/images", express.static(__dirname + '/views/images'));
app.use(fileUploader());

app.use('/', index);
app.use('/addMeme', addMeme);
app.use('/viewAllMemes', viewAllMemes);
app.use('/searchMeme', searchMemes);
app.use('/addGenre', addGenre);
app.use('/getDetails', getMemeDetails);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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
