const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { asyncHandler } = require('../middleware/asyncHandler');
const { authUser } = require('../middleware/authUser');

// CREATE NEW USER
router.post('/', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    };
  };
}));

// GET USER
router.get('/', authUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  console.log(user);

  if (user) {
    res.status(200).json({
      "username": user.username
    });
  } else {
    throw new Error;
  };
}));

// EDIT USER
router.put('/:id', authUser, asyncHandler(async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      if (req.currentUser.id === user.id) {
        console.log(req.body);
        await user.update(req.body);
        res.status(204).end();
      } else {
        res.status(403).json({ message: "You don't have access to edit this user" });
      };
    } else {
      res.status(404).json({ message: "The user was not found" });
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    };
  };
}));

module.exports = router;