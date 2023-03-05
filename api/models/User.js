const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {

  class User extends Model { }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'A user already has this username'
      },
      validate: {
        notNull: {
          msg: 'A username is required'
        },
        notEmpty: {
          msg: 'Please provide a username'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A password is required'
        },
        notEmpty: {
          msg: 'Please provide a password'
        }
      },
      set(val) {
        const hashedPassword = bcrypt.hashSync(val, 10);
        this.setDataValue('password', hashedPassword);
      }
    },
  }, {
    sequelize,
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      as: 'recipeCreator',
      foreignKey: {
        fieldName: 'userId'
      }
    });
  };

  return User;
};

