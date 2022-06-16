var mongoose = require('mongoose');
var dotenv = require('dotenv').config();

// Connect to mongoDB
const uri = process.env.DB_PATH.replace(
  '<password>',
  process.env.DB_TOKEN
)
mongoose.connect(uri).then((res) => {
  console.log('資料庫連線成功！');
});