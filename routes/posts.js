var express = require('express');
var router = express.Router();
const Post = require('../models/PostModel');
const asyncErrorHandler = require('../service/asyncErrorHandler');

// 取得所有貼文
router.get('/', asyncErrorHandler(async (req, res) => {
  const { sort=-1, keyword } = req.query;
  const regex = new RegExp(keyword);
  const posts = await Post.find({ content: regex}).populate(
    {
      path: 'user',
      select: 'name'
    }).sort({ createdAt: sort });
    res.json({
      status: 'success',
      data: posts
    })
}));

// 取得單筆貼文
router.get('/:id', asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate(
    {
      path: 'user',
      select: 'name'
    });
  if (post !== null) {
    res.json({
      status: 'success',
      data: post
    })
  }
}));

// 新增單筆貼文
router.post('/', asyncErrorHandler(async (req, res, next) => {
  const { user, content, photo } = req.body;
  const newPost = await Post.create({
    user,
    content,
    photo
  })
  res.json({
    status: 'success',
    data: newPost
  })
}));

module.exports = router;