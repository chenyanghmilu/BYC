require('dotenv').config();

var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var methodOverride = require("method-override");
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");


require('./config/database');
require('./config/passport');

var indexRouter = require('./routes/index');
var coursesRouter = require('./routes/courses');
var coachesRouter = require('./routes/coaches');
var commentsRouter = require('./routes/comments');
var coachCommentsRouter = require('./routes/coachComments');
var apiRouter = require('./routes/api');
var recipesRouter = require('./routes/recipes');
var googleAuth = require('./routes/googleAuth')

var app = express();

var User = require('./models/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));
app.use(flash());
app.use(cors());


app.use(session({
  secret: "This will protect you!",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use('/', indexRouter);
app.use('/courses', coursesRouter);
app.use('/courses/:id/comments', commentsRouter);
app.use('/coaches/:id/comments', coachCommentsRouter);
app.use('/coaches', coachesRouter);
app.use('/api', apiRouter);
app.use('/recipes', recipesRouter);
app.use('/auth',googleAuth);

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
