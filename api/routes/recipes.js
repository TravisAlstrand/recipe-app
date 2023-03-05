const express = require('express');
const router = express.Router();
const { Recipe } = require('../models');
const { asyncHandler } = require('../middleware/asyncHandler');
const { authUser } = require('../middleware/authUser');

// GET ALL RECIPES
router.get('/', asyncHandler, async (req, res) => {

  const allRecipes = await Recipe.findAll({
    include: {
      model: User,
      as: 'recipeCreator',
      attributes: ['username']
    }
  });

  // create new array, exclude 'created at / updated at' properties
  const recipes = allRecipes.map(({ id, recipeName, ingredients, directions, userId, recipeCreator }) => {
    return { id, recipeName, ingredients, directions, userId, recipeCreator };
  });

  // set status and parse courses to json
  res.status(200).json(recipes);
});

module.exports = router;