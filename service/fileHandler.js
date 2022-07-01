const path = require('path');
const multer = require('multer');

// 檢驗檔案格式
const checkFile = multer({
  limits: {
    fileSize: 1*1024*1024, // 1MB
  },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      const err = new Error('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。');
      err.statusCode = 400;
      err.isOperational = true;
      cb(err);
    }
    cb(null, true);
  },
}).single('image');

module.exports = {
  checkFile,
}