var express = require('express');
var router = express.Router();
const Post = require('../models/PostModel');

router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json({
    status: 'success',
    data: posts
  })
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
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

module.exports = router;