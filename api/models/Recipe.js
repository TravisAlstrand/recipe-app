const { Model, DataTypes, STRING } = require('sequelize');

module.exports = (sequelize) => {

  class Recipe extends Model { }

  Recipe.init({
    recipeName: {
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
    type: {
      type: DataTypes.STRING
    },
    difficulty: {
      type: DataTypes.STRING
    },
    isSlowCooker: {
      type: DataTypes.BOOLEAN
    },
    ingredients: {
      type: DataTypes.STRING
    },
    directions: {
      type: DataTypes.STRING
    },
    prepTime: {
      type: DataTypes.STRING
    },
    cookTime: {
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