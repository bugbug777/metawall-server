var express = require('express');
var router = express.Router();
const User = require('../models/UserModel');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: users
  })
});

router.post('/', async (req, res, next) => {
  try {
    let { name, gender, avatar, email } = req.body;
    if (name && gender && email) {
      const newUser = await User.create({
        ...req.body
      });
      res.status(200).json({
        status: 'sucess',
        data: newUser
      });
    } else {
      res.status(400).json({
        status: 'false',
        message: '新增失敗'
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'false',
      message: error.message
    });
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    let { name, gender, avatar, email } = req.body;
    if (name && gender && email) {
      const editUser = await User.findByIdAndUpdate(id, {
        ...req.body
      }, { new: true});
      res.status(200).json({
        status: 'sucess',
        data: editUser
      });
    } else {
      res.status(400).json({
        status: 'false',
        message: '修改失敗'
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'false',
      message: error.message
    });
  }
});

module.exports = router;
