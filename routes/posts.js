var express = require('express');
var router = express.Router();
const Post = require('../models/PostModel');
const appError = require('../service/appError');

// 取得所有貼文
router.get('/', async (req, res) => {
  const { sort=-1, keyword } = req.query;
  const regex = new RegExp(keyword);
  try {
    const posts = await Post.find({ content: regex}).populate(
      {
        path: 'user',
        select: 'name'
      }).sort({ createdAt: sort });
      res.json({
        status: 'success',
        data: posts
      })
  } catch (error) {
    res.status(400).json({
      status: 'false',
      message: '找不到相關資料'
    })
  }
});

// 取得單筆貼文
router.get('/:id', async (req, res) => {
  try {
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
    } else {
      res.status(400).json({
        status: 'false',
        message: '找不到該筆資料！'
      })
    }
  } catch (error) {
    res.status(400).json({
      status: 'false',
      message: error.message
    })
  }
});

// 新增單筆貼文
router.post('/', async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
});

module.exports = router;