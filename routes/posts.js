var express = require("express");
var router = express.Router();
const { checkAuth } = require("../service/auth");
const PostController = require("../controllers/posts");

// 動態貼文
router.get(
  "/",
  checkAuth,
  PostController.getPosts
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '取得所有貼文'
    #swagger.responses[200] = {
      description: '成功回傳！',
      schema: { $ref: '#/definitions/postsSchema' }
    }
  */
);
router.get(
  "/:id",
  checkAuth,
  PostController.getPost
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '取得單筆貼文'
    #swagger.parameters['id'] = {
      in: 'path',
      description: '貼文 ID',
      required: true,
    }
    #swagger.responses[200] = {
      description: '成功回傳！',
      schema: { $ref: '#/definitions/postSchema' }
    }
  */
);
router.post(
  "/",
  checkAuth,
  PostController.addPost
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '新增一筆貼文'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: { $ref: '#/definitions/postParams' }
    }
    #swagger.responses[200] = {
      description: '新增成功！',
      schema: { $ref: '#/definitions/newPostSchema' }
    }
  */
);
router.patch(
  "/:id",
  checkAuth,
  PostController.editPost
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '編輯單筆貼文'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: {
        $content: "The post is created by Sihle"
      }
    }
    #swagger.responses[200] = {
      description: '修改成功！',
      schema: { $ref: '#/definitions/newPostSchema' }
    }
  */
);

// 貼文按讚、留言
router.post(
  "/:id/like",
  checkAuth,
  PostController.addLike
  /*
    #swagger.tags = ['Posts - 貼文按讚、留言']
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '新增貼文按讚'
    #swagger.responses[200] = {
      description: '成功按讚！',
      schema: { $ref: '#/definitions/likePostSchema' }
    }
  */
);
router.delete(
  "/:id/unlike",
  checkAuth,
  PostController.removeLike
  /*
    #swagger.tags = ['Posts - 貼文按讚、留言']
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '移除貼文按讚'
    #swagger.responses[200] = {
      description: '成功取消按讚！',
      schema: { $ref: '#/definitions/likePostSchema' }
    }
  */
);
router.get(
  "/user/:id",
  checkAuth,
  PostController.getPersonalPosts
  /*
    #swagger.tags = ['Posts - 貼文按讚、留言']
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '取得個人所有貼文'
    #swagger.parameters['id'] = {
      in: 'path',
      description: '使用者 ID',
      required: true,
    }
    #swagger.responses[200] = {
      description: '新增成功！',
      schema: { $ref: '#/definitions/postSchema' }
    }
  */
);
router.post(
  "/:id/comment",
  checkAuth,
  PostController.addComment
  /*
    #swagger.tags = ['Posts - 貼文按讚、留言']
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '新增一筆貼文留言'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: { $comment: "Today is a good day today!" }
    }
    #swagger.responses[200] = {
      description: '新增成功！',
      schema: { $ref: '#/definitions/commentSchema' }
    }
  */
);

// 後台貼文管理
router.delete(
  "/",
  PostController.deletePosts
  /*
    #swagger.ignore = true
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.tags = ['Posts - 輔助測試']
    #swagger.description = '刪除所有貼文'
    #swagger.responses[200] = {
      description: '新增成功！',
      schema: {
        status: true,
        posts: []
      }
    }
  */
);

module.exports = router;
