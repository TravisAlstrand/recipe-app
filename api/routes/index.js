const express = require('express');
const router = express.Router();
const { User, Recipe } = require('../models');
const { asyncHandler } = require('../middleware/asyncHandler');

// CREATE NEW USER
router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.setHeader('Location', '/')
      .status(201)
      .end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    };
  };
}));


// GET ALL USERS
router.get('/users', asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
}))

module.exports = router;