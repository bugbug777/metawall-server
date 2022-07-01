const { ImgurClient } = require('imgur');
const sizeOf = require('image-size');
const appError = require('../service/appError');
const asyncErrorHandler = require('../service/asyncErrorHandler');

const uploadToImgur = asyncErrorHandler(async (req, res, next) => {
  const { type } = req.query;

  if(!req.file) return appError(400,'尚未上傳檔案',next);

  if (type === 'avatar') {
    const dimension = sizeOf(req.file.buffer);
    if (dimension.width !== dimension.height) return appError(400, '圖片不是 1:1 尺寸！', next);
  }
  
  const client = new ImgurClient({
    clientId: process.env.IMGUR_CLIENT_ID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
    refreshToken: process.env.IMGUR_REFRESH_TOKEN
  });

  const response = await client.upload({
    type: 'base64',
    album: process.env.IMGUR_ALBUM_ID,
    image: req.file.buffer.toString('base64')
  });
  
  res.json({
    status: true,
    imageUrl: response.data.link
  })
});

module.exports = {
  uploadToImgur
}