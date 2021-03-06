const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const Comment = require("../models/CommentModel"); // 沒匯入，還會不給用的
const appError = require("../service/appError");
const asyncErrorHandler = require("../service/asyncErrorHandler");

//////
//  動態貼文
////

// 取得所有貼文
const getPosts = asyncErrorHandler(async (req, res) => {
  const { sort = -1, keyword } = req.query;
  const regex = new RegExp(keyword);
  const posts = await Post.find({ content: regex })
    .populate({
      path: "user",
      select: "name avatar",
    })
    .populate({
      path: "comments",
      select: "user content createdAt -post",
    })
    .sort({ createdAt: sort });

  res.json({
    status: true,
    posts
  })
});

// 取得單筆貼文
const getPost = asyncErrorHandler(async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.findById(postId)
    .populate({
      path: "user",
      select: "name avatar",
    });

  if (!post) return appError(400, "該貼文不存在！", next);

  res.json({
    status: true,
    post
  })
});

// 新增單筆貼文
const addPost = asyncErrorHandler(async (req, res, next) => {
  const { content, imageUrl } = req.body;

  if (!content) return appError(400, "貼文內容不能為空！", next);
  const newPost = await Post.create({
    user: req.user.id,
    content,
    imageUrl,
  });

  res.json({
    status: true,
    post: newPost
  })
});

// 新增貼文按讚
const addLike = asyncErrorHandler(async (req, res, next) => {
  const postId = req.params.id;
  const newPost = await Post.findByIdAndUpdate(
    postId,
    { $addToSet: { likes: req.user.id } },
    { new: true }
  );

  if (!newPost) return appError(400, "找不到該筆貼文！", next);

  res.status(201).json({
    status: true,
    post: newPost
  });
});

// 取消貼文按讚
const removeLike = asyncErrorHandler(async (req, res, next) => {
  const postId = req.params.id;
  const newPost = await Post.findByIdAndUpdate(
    postId,
    { $pull: { likes: req.user.id } },
    { new: true }
  );

  if (!newPost) return appError(400, "找不到該筆貼文！", next);

  res.status(201).json({
    status: true,
    post: newPost
  });
});

// 新增使用者留言
const addComment = asyncErrorHandler(async (req, res, next) => {
  const postId = req.params.id;
  const { content } = req.body;

  const post = await Post.findById(postId);
  if (!post) return appError(400, "該貼文不存在！", next);

  if (!content) return appError(400, "留言內容不能為空！", next);
  const newComment = await Comment.create({
    post: postId,
    user: req.user.id,
    content,
  });

  res.status(201).json({
    status: true,
    comment: newComment
  })
});

// 取得個人貼文列表
const getPersonalPosts = asyncErrorHandler(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) return appError(400, "找不到該名使用者！", next);

  const posts = await Post.find({ user }).populate({
    path: 'user',
    select: 'name avatar'
  })
  
  res.json({
    status: true,
    posts
  })
});

//////
//  後台管理
////

// 編輯單筆貼文
const editPost = asyncErrorHandler(async (req, res, next) => {
  const postId = req.params.id;
  const { content } = req.body;

  if (!content) return appError(400, "貼文修改能容不能為空！");
  const post = await Post.findById(postId);

  if (!post) return appError(400, "該貼文不存在！", next);

  if (req.user.id !== String(post.user)) return appError(400, "非該貼文作者不能修改該貼文！", next);
  const editedPost = await Post.findByIdAndUpdate(
    postId,
    { content },
    { new: true }
  );

  res.json({
    status: true,
    post: editPost
  });
});

// 刪除所有貼文
const deletePosts = asyncErrorHandler(async (req, res) => {
  await Post.deleteMany({});

  res.json({
    status: true,
    posts: []
  });
});

module.exports = {
  getPosts,
  getPost,
  addPost,
  addLike,
  removeLike,
  addComment,
  getPersonalPosts,
  editPost,
  deletePosts,
};
