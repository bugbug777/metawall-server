var express = require("express");
var router = express.Router();
const { checkAuth } = require("../service/auth");
const UserController = require("../controllers/users");

/* GET users listing. */
// 權限驗證
router.get(
  "/check",
  checkAuth,
  UserController.checkAuth
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.tags = ['Users - 授權檢查']
    #swagger.description = '檢查登入狀態'
    #swagger.responses[200] = {
      description: '授權驗證成功！',
      schema: { $ref: '#/definitions/userSchema' }
    }
  */
);
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
      schema: { $ref: '#/definitions/registerParams' }
    }
    #swagger.responses[200] = {
      description: '新增成功！',
      schema: { $ref: '#/definitions/userTokenSchema' }
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
      schema: { $ref: '#/definitions/signinParams' }
    }
    #swagger.responses[200] = {
      description: '登入成功！',
      schema: { $ref: '#/definitions/userTokenSchema' }
    }
  */
);
router.get(
  "/profile",
  checkAuth,
  UserController.getProfile
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '取得登入會員個人資料'
    #swagger.responses[200] = {
      description: '成功回傳！',
      schema: { $ref: '#/definitions/profileSchema' }
    }
  */
);
router.get(
  "/profile/:id",
  checkAuth,
  UserController.getUserProfile
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.description = '取得使用者個人資料'
    #swagger.responses[200] = {
      description: '成功回傳！',
      schema: { $ref: '#/definitions/profileResponse' }
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
      schema: { $ref: '#/definitions/updateProfileParams' }
    }
    #swagger.responses[200] = {
      description: '更新成功！',
      schema: { $ref: '#/definitions/profileSchema' }
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
      schema: { $ref: '#/definitions/updatePasswordParams' }
    }
    #swagger.responses[200] = {
      description: '更新成功！',
      schema: { $ref: '#/definitions/userTokenSchema' }
    }
  */
);

// 會員按讚追蹤動態
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
      schema: { $ref: '#/definitions/postsSchema' }
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
      schema: { $ref: '#/definitions/followingUsersSchema' }
    }
  */
);
router.post(
  "/:id/follow",
  checkAuth,
  UserController.followUser
  /*
    #swagger.security = [{ 'apiKeyAuth': [] }]
    #swagger.tags = ['Users - 好友按讚、追蹤']
    #swagger.description = '追蹤好友'
    #swagger.responses[200] = {
      description: '成功追蹤！',
      schema: {
        "status": true,
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
    #swagger.description = '取消追蹤好友'
    #swagger.responses[200] = {
      description: '成功取消追蹤！',
      schema: {
        "status": true,
        "data": {
            "message": "成功取消追蹤！"
        }
      }
    }
  */
);



// 後台會員管理
router.get(
  "/",
  UserController.getUsers
  /*
    #swagger.ignore = true
    #swagger.tags = ['Users - 後台會員管理']
    #swagger.description = '取得所有使用者'
    #swagger.responses[200] = {
      description: '成功取得所有使用者！',
      schema: { $ref: '#/definitions/usersSchema' }
    }
  */
);
router.delete(
  "/",
  UserController.deleteUsers
  /*
    #swagger.ignore = true
    #swagger.tags = ['Users - 後台會員管理']
    #swagger.description = '刪除所有使用者'
    #swagger.responses[200] = {
      description: '成功刪除所有使用者！',
      schema: {
        status: true,
        users: []
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
