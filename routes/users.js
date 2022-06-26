var express = require("express");
var router = express.Router();
const { checkAuth } = require("../service/auth");
const UserController = require("../controllers/users");

/* GET users listing. */
// 會員功能
router.post(
  "/sign_up",
  UserController.signUp
  /*
    #swagger.description = '會員註冊'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: { $ref: '#/definitions/addUser' }
    }
    #swagger.responses[200] = {
      description: '新增成功！',
      schema: { $ref: '#/definitions/registerSuccess' }
    }
  */
);
router.post(
  "/sign_in",
  UserController.signIn
  /*
    #swagger.description = '會員登入'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: { $ref: '#/definitions/userLogin' }
    }
    #swagger.responses[200] = {
      description: '登入成功！',
      schema: { $ref: '#/definitions/loginSuccess' }
    }
  */
);
router.get(
  "/profile",
  checkAuth,
  UserController.getProfile
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '取得個人資料'
    #swagger.responses[200] = {
      description: '成功回傳！',
      schema: { $ref: '#/definitions/authSuccess' }
    }
  */
);
router.patch(
  "/profile",
  checkAuth,
  UserController.updateProfile
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '更新個人資料'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: { $ref: '#/definitions/updateProfile' }
    }
    #swagger.responses[200] = {
      description: '更新成功！',
      schema: { $ref: '#/definitions/updateProfileSuccess' }
    }
  */
);
router.post(
  "/updatePassword",
  checkAuth,
  UserController.updatePassword
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '更新個人資料'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: { $ref: '#/definitions/updatePassword' }
    }
    #swagger.responses[200] = {
      description: '更新成功！',
      schema: { $ref: '#/definitions/updatePasswordSuccess' }
    }
  */
);

// 會員按讚追蹤動態
router.post(
  "/:id/follow",
  checkAuth,
  UserController.followUser
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.tags = ['Users - 好友按讚、追蹤']
    #swagger.description = '追蹤好友'
    #swagger.parameters['id'] = {
      in: 'path',
      description: '使用者 ID',
      required: true,
    }
    #swagger.responses[200] = {
      description: '成功追蹤！',
      schema: {
        "status": "success",
        "data": {
            "message": "成功追蹤！"
        }
      }
    }
  */
);
router.delete(
  "/:id/unfollow",
  checkAuth,
  UserController.unfollowUser
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.tags = ['Users - 好友按讚、追蹤']
    #swagger.description = '追蹤好友'
    #swagger.responses[200] = {
      description: '成功取消追蹤！',
      schema: {
        "status": "success",
        "data": {
            "message": "成功取消追蹤！"
        }
      }
    }
  */
);
router.get(
  "/getLikeList",
  checkAuth,
  UserController.getLikeList
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.tags = ['Users - 好友按讚、追蹤']
    #swagger.description = '追蹤好友'
    #swagger.responses[200] = {
      description: '成功取得按讚列表！',
      schema: { $ref: '#/definitions/getLikeList' }
    }
  */
);
router.get(
  "/following",
  checkAuth,
  UserController.getFollowingList
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.tags = ['Users - 好友按讚、追蹤']
    #swagger.description = '追蹤好友'
    #swagger.responses[200] = {
      description: '成功取得追蹤列表！',
      schema: { $ref: '#/definitions/getFollowingList' }
    }
  */
);

// 輔助測試
router.get(
  "/",
  UserController.getUsers
  /*
    #swagger.tags = ['Users - 輔助測試']
    #swagger.description = '取得所有使用者'
    #swagger.responses[200] = {
      description: '成功取得所有使用者！',
      schema: { $ref: '#/definitions/getUsers' }
    }
  */
);
router.delete(
  "/",
  UserController.deleteUsers
  /*
    #swagger.tags = ['Users - 輔助測試']
    #swagger.description = '刪除所有使用者'
    #swagger.responses[200] = {
      description: '成功取得所有使用者！',
      schema: {
        status: 'success',
        data: []
      }
    }
  */
);

const passport = require("passport");

// Google Oauth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
  /*
    #swagger.tags = ['Users - 第三方驗證']
    #swagger.ignore = true
  */
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Successful authentication, redirect home.
    // res.redirect('/');
    res.json({
      status: true,
      data: req.user,
    });
  }
  /*
    #swagger.tags = ['Users - 第三方驗證']
    #swagger.ignore = true
  */
);

module.exports = router;
