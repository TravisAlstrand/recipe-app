const express = require('express');
const router = express.Router();
const { User, Recipe } = require('../models');
const { asyncHandler } = require('../middleware/asyncHandler');
const { authUser } = require('../middleware/authUser');

// CREATE NEW USER
router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res
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

// GET USER
router.get('/users', authUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;

  if (user) {
    res.status(200).json({
      "username": user.username
    });
  } else {
    throw new Error;
  };
}));

// EDIT USER
router.put('/users/:id', authUser, asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (recipe) {
      if (req.currentUser.id === recipe.userId) {
        await recipe.update(req.body);
        res.status(204).end();
      } else {
        res.status(403).json({ message: "You don't have access to this recipe" });
      };
    } else {
      res.status(404).json({ message: "The recipe was not found" });
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