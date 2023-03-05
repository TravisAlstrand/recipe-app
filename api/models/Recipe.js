const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {

  class Recipe extends Model { }

  Recipe.init({
    recipe_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'A recipe already has this name'
      },
      validate: {
        notNull: {
          msg: 'A recipe name is required'
        },
        notEmpty: {
          msg: 'Please provide a recipe name'
        }
      }
    },
    ingredients: {
      type: DataTypes.STRING
    },
    directions: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    timestamps: false
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      as: 'recipeCreator',
      foreignKey: {
        fieldName: 'userId'
      }
    });
  };

  return Recipe;
};