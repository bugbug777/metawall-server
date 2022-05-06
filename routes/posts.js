var express = require('express');
var router = express.Router();
const Post = require('../models/PostModel');

// 取得所有貼文
router.get('/', async (req, res) => {
  const { sort, keyword } = req.query;
  const regex = new RegExp(keyword);
  const posts = await Post.find({ name: regex}).populate(
    {
      path: 'user',
      select: 'name'
    }).sort({ createdAt: sort });
  if (posts.length > 0 ) {
    res.json({
      status: 'success',
      data: posts
    })
  } else {
    res.status(400).json({
      status: 'false',
      message: '找不到相關資料！'
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
router.post('/', async (req, res) => {
  try {
    const { user, content, photo } = req.body;
    if (content) {
      const newPost = await Post.create({
        user,
        content,
        photo
      })
      res.json({
        status: 'success',
        data: newPost
      })
    } else {
      res.status(400).json({
        status: 'false',
        message: '貼文內容為必填！'
      })
    }
  } catch (error) {
    res.status(400).json({
      status: 'false',
      message: error.message
    })
  }
});

module.exports = router;