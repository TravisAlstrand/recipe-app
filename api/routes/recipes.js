const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { User, Recipe } = require('../models');
const { asyncHandler } = require('../middleware/asyncHandler');
const { authUser } = require('../middleware/authUser');

// GET ALL RECIPES
router.get('/', asyncHandler(async (req, res) => {

  const allRecipes = await Recipe.findAll({
    include: {
      model: User,
      as: 'recipeCreator',
      attributes: ['username']
    }
  });

  res.status(200).json(allRecipes);
}));

// GET SINGLE RECIPE
router.get('/:id', asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findByPk(req.params.id, {
    include: {
      model: User,
      as: 'recipeCreator',
      attributes: ['username']
    }
  });

  if (recipe) {
    res.status(200).json(recipe);
  } else {
    res.status(404);
    next();
  };
}));

// CREATE NEW RECIPE
router.post('/', authUser, asyncHandler(async (req, res) => {

  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).setHeader('Location', `/recipes/${recipe.id}`).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    };
  };
}));

// EDIT RECIPE
router.put('/:id', authUser, asyncHandler(async (req, res) => {

  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      if (req.currentUser.id === recipe.userId) {
        await recipe.update(req.body);
        res.status(204).end();
      } else {
        res.status(403).json({ message: "You don't have access to this recipe." });
      };
    } else {
      res.status(404).json({ message: "The recipe was not found" });
    };
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    };
  };
}));

// DELETE RECIPE
router.delete('/:id', authUser, asyncHandler(async (req, res) => {

  const recipe = await Recipe.findByPk(req.params.id);

  if (recipe) {
    if (req.currentUser.id === recipe.userId) {
      await recipe.destroy();
      res.status(204).end();
    } else {
      res.status(403).json({ message: "You don't have access to this recipe" });
    };
  } else {
    res.status(404).json({ message: "The recipe was not found" });
  };
}));

// SORT
router.get('/sort', asyncHandler(async (req, res) => {
  const attribute = req.body.key;
  const value = req.body.value;
  const recipes = await Recipe.findAll({
    where: {
      [attribute]: value
    },
    include: {
      model: User,
      as: 'recipeCreator',
      attributes: ['username']
    }
  })
}))

module.exports = router;