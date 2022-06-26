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
      schema: { $ref: '#/definitions/getPosts' }
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
      schema: { $ref: '#/definitions/getPost' }
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
      schema: { $ref: '#/definitions/addPost' }
    }
    #swagger.responses[200] = {
      description: '新增成功！',
      schema: { $ref: '#/definitions/addPostSuccess' }
    }
  */
);
router.post(
  "/:id/like",
  checkAuth,
  PostController.addLike
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '新增貼文按讚'
    #swagger.parameters['id'] = {
      in: 'path',
      description: '貼文 ID',
      required: true,
    }
    #swagger.responses[200] = {
      description: '成功按讚！',
      schema: { $ref: '#/definitions/addLikeSuccess' }
    }
  */
);
router.delete(
  "/:id/unlike",
  checkAuth,
  PostController.removeLike
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '移除貼文按讚'
    #swagger.parameters['id'] = {
      in: 'path',
      description: '貼文 ID',
      required: true,
    }
    #swagger.responses[200] = {
      description: '成功取消按讚！',
      schema: { $ref: '#/definitions/unlikeSuccess' }
    }
  */
);
router.post(
  "/:id/comment",
  checkAuth,
  PostController.addComment
  /*
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
      schema: { $ref: '#/definitions/addCommentSuccess' }
    }
  */
);
router.get(
  "/user/:id",
  checkAuth,
  PostController.getPersonalPosts
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '取得個人所有貼文'
    #swagger.parameters['id'] = {
      in: 'path',
      description: '使用者 ID',
      required: true,
    }
    #swagger.responses[200] = {
      description: '新增成功！',
      schema: { $ref: '#/definitions/getPersonalPostsSuccess' }
    }
  */
);

// 輔助測試
router.patch(
  "/:id",
  checkAuth,
  PostController.editPost
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.tags = ['Posts - 輔助測試']
    #swagger.description = '編輯單筆貼文'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: {
        $content: "修改過的貼文！"
      }
    }
    #swagger.responses[200] = {
      description: '修改成功！',
      schema: { $ref: '#/definitions/editPostSuccess' }
    }
  */
);
router.delete(
  "/",
  PostController.deletePosts
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.tags = ['Posts - 輔助測試']
    #swagger.description = '刪除所有貼文'
    #swagger.responses[200] = {
      description: '新增成功！',
      schema: {
        status: 'success',
        data: []
      }
    }
  */
);

module.exports = router;
