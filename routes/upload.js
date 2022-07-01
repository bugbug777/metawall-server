var express = require("express");
var router = express.Router();
const { checkAuth } = require("../service/auth");
const { checkFile } = require("../service/fileHandler");
const UploadController = require("../controllers/upload");

router.post(
  "/",
  checkAuth,
  checkFile,
  UploadController.uploadToImgur
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '上傳圖片'
    #swagger.parameters = {
      in: 'formData',
      description: '資料格式',
      required: true,
      type: 'file'
    }
    #swagger.responses[200] = {
      description: '上傳成功！',
      schema: {
        status: true,
        data: "https://i.imgur.com/DfBOYlv.jpg"
      }
    }
  */
);

module.exports = router;
