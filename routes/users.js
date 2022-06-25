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
      schema: {
          "$name": "sihle",
          "$email": "gubug777@gmail.com",
          "$password": "qwe12345"
      }
    }
    #swagger.responses[200] = {
      description: '新增成功！',
      schema: {
        "status": "success",
        "data": {
            "name": "sihle",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjZkN2EyZTEyNWQ3YjNhYTBlYTdkYiIsImlhdCI6MTY1NjE0OTkyMywiZXhwIjoxNjU4NzQxOTIzfQ.J60uNuIFO2AIBciQbsayVjY6wCpHHYPjxMqnIIFxvsM"
        }
      }
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
      schema: {
          "$email": "gubug777@gmail.com",
          "$password": "qwe12345"
      }
    }
    #swagger.responses[200] = {
      description: '登入成功！',
      schema: {
        "status": "success",
        "data": {
            "name": "sihle",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjZkN2EyZTEyNWQ3YjNhYTBlYTdkYiIsImlhdCI6MTY1NjE0OTkyMywiZXhwIjoxNjU4NzQxOTIzfQ.J60uNuIFO2AIBciQbsayVjY6wCpHHYPjxMqnIIFxvsM"
        }
      }
    }
  */
);
router.get(
  "/profile",
  checkAuth,
  UserController.getProfile
  /*
    #swagger.description = '取得個人資料'
    #swagger.responses[200] = {
      description: '成功回傳！',
      schema: {
        "status": "success",
        "data": {
            "_id": "62b6d7a2e125d7b3aa0ea7db",
            "name": "sihle",
            "email": "gubug777@gmail.com",
            "gender": "male",
            "avatar": "",
            "followers": [],
            "following": []
        }
      }
    }
  */
);
router.patch(
  "/profile",
  checkAuth,
  UserController.updateProfile
  /*
    #swagger.description = '更新個人資料'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: {
          "$name": "sihle",
          "$gender": "male",
          "avatar": ""
      }
    }
    #swagger.responses[200] = {
      description: '更新成功！',
      schema: {
        "status": "success",
        "data": {
            "_id": "62b6d7a2e125d7b3aa0ea7db",
            "name": "sihle",
            "email": "gubug777@gmail.com",
            "gender": "male",
            "avatar": "",
            "followers": [],
            "following": []
        }
      }
    }
  */
);
router.post(
  "/updatePassword",
  checkAuth,
  UserController.updatePassword
  /*
    #swagger.description = '更新個人資料'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: {
          "$password": "qwe12345",
          "$confirmedPassword": "qwe12345"
      }
    }
    #swagger.responses[200] = {
      description: '更新成功！',
      schema: {
        "status": "success",
        "data": {
            "name": "sihle",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjZkN2EyZTEyNWQ3YjNhYTBlYTdkYiIsImlhdCI6MTY1NjE3MTQ5MCwiZXhwIjoxNjU4NzYzNDkwfQ.fPIKkdg1uMXVEtvEwD9e3k22hUo3M3KPYXxUfK-J_08"
        }
      }
    }
  */
);

// 會員按讚追蹤動態
router.post("/:id/follow", checkAuth, UserController.followUser);
router.delete("/:id/unfollow", checkAuth, UserController.unfollowUser);
router.get("/getLikeList", checkAuth, UserController.getLikeList);
router.get("/following", checkAuth, UserController.getFollowingList);

// 輔助測試
router.get("/", UserController.getUsers);
router.delete("/", UserController.deleteUsers);

const passport = require("passport");

// Google Oauth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
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
);

module.exports = router;
