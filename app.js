var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var dotenv = require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

// Connect to mongoDB
const uri = process.env.DB_PATH.replace(
  '<password>',
  process.env.DB_TOKEN
)
mongoose.connect(uri).then((res) => {
  console.log('資料庫連線成功！');
});
var app = express();

// Uncaught Exceptions
process.on('uncaughtException', (err, origin) => {
  console.error('Uncaught Exception!');
  console.error(err);
  process.exit(1);
});
// Unhandled Rejection
process.on('unhandledRejection', (err, promise) => {
  console.error('Reason：', err);
  console.error('Unhandled rejection：', promise);
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// No matched path
app.use((req, res, next) => {
  res.status(404).send('Page is not found!')
});
// Express programming error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('程式出現異常，請聯絡管理員！');
})

module.exports = app;
