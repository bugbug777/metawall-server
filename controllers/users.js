const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const appError = require("../service/appError");
const asyncErrorHandler = require("../service/asyncErrorHandler");
const { generateToken, verifyToken } = require("../service/auth");

//////
//  後台管理
////

// 取得所有使用者
const getUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();

  res.json({
    status: true,
    users
  });
});

// 刪除所有使用者
const deleteUsers = asyncErrorHandler(async (req, res, next) => {
  await User.deleteMany({});
  
  res.json({
    status: true,
    users: []
  })
});

//////
//  會員功能
////

// 登入授權驗證
const checkAuth = asyncErrorHandler(async (req, res, next) => {
  const { _id, name, avatar } = req.user;

  res.json({
    status: true,
    user: { _id, name, avatar }
  });
});

// 註冊會員
const signUp = asyncErrorHandler(async (req, res, next) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password)
    return appError(400, "欄位資訊不能為空！", next);
  if (!validator.isLength(name, { min: 2 }))
    return appError(400, "使用者暱稱長度必須為 2 個字元以上！", next);
  if (!validator.isEmail(email))
    return appError(400, "Email 格式不符合！", next);
  if (!validator.isAlphanumeric(password))
    return appError(400, "密碼只能是英數字的組合！", next);
  if (!validator.isLength(password, { min: 8, max: 16 }))
    return appError(400, "密碼長度只能介於 8 到 16 碼！", next);

  const isRegistered = await User.findOne({ email: email });
  if (isRegistered) return appError(400, "該電子信箱已被使用者註冊！", next);

  password = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    name,
    email,
    password,
  });

  const token = await generateToken(newUser);

  res.status(201).json({
    status: true,
    user: {
      name: newUser.name,
      token,
    },
  });
});

// 登入會員
const signIn = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return appError(400, "帳號密碼不能為空！", next);
  const user = await User.findOne({ email }).select("+password");

  if (!user) return appError(400, "帳號或密碼錯誤！", next);
  const isConfirmed = await bcrypt.compare(password, user.password);

  if (!isConfirmed) return appError(400, "帳號或密碼錯誤！", next);
  const token = await generateToken(user);

  res.json({
    status: true,
    user: {
      name: user.name,
      token,
    },
  });
});

// 重設密碼
const updatePassword = asyncErrorHandler(async (req, res, next) => {
  let { password, confirmedPassword } = req.body;

  if (!validator.isAlphanumeric(password))
    return appError(400, "密碼只能是英數字的組合！", next);
  if (!validator.isLength(password, { min: 8, max: 16 }))
    return appError(400, "密碼長度只能介於 8 到 16 碼！", next);
  if (!password || !confirmedPassword)
    return appError(400, "欄位資訊不能為空！", next);
  if (!validator.isLength(password, { min: 8, max: 16 }))
    return appError(400, "密碼長度只能介於 8 到 16 碼！", next);
  if (password !== confirmedPassword)
    return appError(400, "密碼不一致！", next);

  password = await bcrypt.hash(password, 12);
  const editedUser = await User.findByIdAndUpdate(req.user._id, { password });

  const token = await generateToken(editedUser);

  res.json({
    status: true,
    user: {
      name: editedUser.name,
      token,
    },
  });
});

// 取得個人資料
const getProfile = asyncErrorHandler(async (req, res, next) => {
  const user = req.user;

  res.json({
    status: true,
    user,
  });
});

// 取得使用者個人資料
const getUserProfile = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  
  res.json({
    status: true,
    user,
  });
});

// 更新個人資料
const updateProfile = asyncErrorHandler(async (req, res, next) => {
  const { name, gender, avatar } = req.body;

  if (!name || !gender) return appError(400, "欄位資訊不能為空！", next);
  const editedUser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, gender, avatar },
    { new: true, runValidators: true }
  );

  res.json({
    status: true,
    user: editedUser,
  });
});

//////
//  會員按讚追蹤功能
////

// 追蹤朋友
const followUser = asyncErrorHandler(async (req, res, next) => {
  const followingUser = await User.findById(req.params.id);

  if (!followingUser) return appError(400, "該使用者不存在！", next);
  if (req.params.id === req.user.id)
    return appError(401, "使用者不允許追蹤自己！", next);

  // 使用者自己。 如果在 following.user 中有追蹤朋友的 id 就過濾掉
  await User.updateOne(
    {
      _id: req.user.id,
      "following.user": { $ne: followingUser.id },
    },
    { $addToSet: { following: { user: followingUser.id } } }
  );

  // 追蹤的朋友。 如果在 followers.user 中有使用者自己的 id 就過濾掉
  await User.updateOne(
    {
      _id: followingUser.id,
      "followers.user": { $ne: req.user.id },
    },
    { $addToSet: { followers: { user: req.user.id } } }
  );

  res.json({
    status: true,
    message: "成功追蹤！",
  });
});

// 取消追蹤朋友
const unfollowUser = asyncErrorHandler(async (req, res, next) => {
  const unFollowingUser = await User.findById(req.params.id);
  if (!unFollowingUser) return appError(400, "該使用者不存在！", next);

  if (unFollowingUser.id === req.user.id)
    return appError(401, "使用者不允許取消追蹤自己！", next);

  // 使用者自己
  await User.updateOne(
    { _id: req.user.id },
    { $pull: { following: { user: unFollowingUser.id } } }
  );

  // 追蹤的朋友
  await User.updateOne(
    { _id: unFollowingUser.id },
    { $pull: { followers: { user: req.user.id } } }
  );

  res.json({
    status: true,
    message: "成功取消追蹤！",
  });
});

// 取得個人按讚列表
const getLikeList = asyncErrorHandler(async (req, res, next) => {
  const likeList = await Post.find({ likes: { $in: [req.user.id] } }).populate({
    path: "user",
    select: "name avatar",
  });

  res.json({
    status: true,
    posts: likeList,
  });
});

// 取得個人追蹤名單
const getFollowingList = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "following.user",
    select: "name avatar",
  });

  res.json({
    status: true,
    users: user.following,
  });
});

module.exports = {
  getUsers,
  deleteUsers,
  checkAuth,
  signUp,
  signIn,
  getProfile,
  getUserProfile,
  updateProfile,
  updatePassword,
  followUser,
  unfollowUser,
  getLikeList,
  getFollowingList,
};
