const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 获取用户列表
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// 添加新用户
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  await user.save();
  res.status(201).json(user);
});

module.exports = router;
