var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const glob = require('glob');
const mongoose = require('mongoose');
const router = require('express').Router();
const db = require('./db/dbSettings.json');
const { createCryptoEncrypt } = require('./utils/encrypto/bcrypt');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  // console.log(req.path);
  if (req.path == '/api/user/register') {
    let password = createCryptoEncrypt(req.body.password);
    if (password) {
      req.body.password = password;
    }
  }
  next();
})
app.use(router);

mongoose.connect(db.settings.dbUrl, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
}).then((data) => {
  console.log('Database connected');


  glob('modules/**/routes/', (err, routeFiles) => {
    if (err) {
      console.log('error in route traversing ', err);
      return;
    }

    routeFiles.forEach(file => {
      const route = require(path.resolve(file));
      router.use('/', route);
    });

    app.use((req, res, next) => {
      var err = new Error('Not Found')
      err.status = 404;
      next(err);
    })

    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json(err);
    })
  })


}).catch(err => {
  console.log('oopse error occured', err)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

setTimeout(() => {
  console.log(app.get("port"))
}, 2000);


module.exports = app;
