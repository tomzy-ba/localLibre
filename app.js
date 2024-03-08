var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();

const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(

  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["['self'", "code.jquery.com",
      "cdn.jsdelivr.net"],
    },
  }),
)

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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

mongoose.set("strictQuery", false);

const mongoDB = process.env.mongoDB;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const Schema = mongoose.Schema;

const ExampleSchema = new Schema({
  a_string: String,
  a_date: Date,
});

module.exports = app;
