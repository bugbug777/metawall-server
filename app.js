var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var uploadRouter = require('./routes/upload');

require('./connections/mongoose');
require('./connections/passport');


var app = express();

// Uncaught Exceptions
process.on('uncaughtException', (err, origin) => {
  console.error('Uncaught Exception!');
  console.error(err);
  process.exit(1);
});
// Unhandled Rejection
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled reason：', err);
  console.error('Unhandled rejection：', promise);
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter /* #swagger.tags = ['Users - 會員功能'] */);
app.use('/posts', postsRouter /* #swagger.tags = ['Posts - 貼文功能'] */);
app.use('/upload', uploadRouter /* #swagger.tags = ['Upload - 圖片上傳'] */);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// No matched path
app.use((req, res, next) => {
  res.status(404).json({
    status: 'false',
    message: '該頁面不存在！'
  })
});
// Express programming error
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500

  // Development
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      errorName: err.name,
      statusCode: err.statusCode,
      message: err.message,
      stacks: err.stack,
      error: err
    });
  }

  // Production
  if (process.env.NODE_ENV === 'production') {
    // 針對 Mongoose validator errors 進行客製化
    if (err.name === 'ValidationError') {
      err.message = '欄位未填寫正確，請重新輸入！';
      err.isOperational = true;
    }
    if (err.name === 'CastError') {
      err.message = '找不到該筆資料！';
      err.isOperational = true;
    }
    if (err.name === 'SyntaxError') {
      err.message = '請輸入正確的資料格式！';
      err.isOperational = true;
    }
    if (err.name === 'JsonWebTokenError') {
      err.message = '請輸入正確的 JWT 格式！';
      err.isOperational = true;
    }
    if (err.name === 'TokenExpiredError') {
      err.message = 'JWT 過期，請重新登入！';
      err.isOperational = true;
    }
    if (err.isOperational) {
      res.status(400).json({
        status: 'false',
        message: err.message
      })
    } else {
      console.error('重大系統錯誤！！', err);
      res.status(500).json({
        status: 'error',
        message: '系統發生問題，請聯繫管理員！'
      })
    }
  }
})

module.exports = app;
