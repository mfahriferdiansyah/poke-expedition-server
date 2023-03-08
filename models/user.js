'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserItem, {
        onDelete: "cascade",
        onUpdate: "cascade"
      })
      User.hasMany(models.UserPokemon, {
        onDelete: "cascade",
        onUpdate: "cascade"
      })
      User.hasMany(models.Exploration, {
        onDelete: "cascade",
        onUpdate: "cascade"
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: `Email already exist`},
      validate: {
        notNull: {msg: `Email is required`},
        notEmpty: {msg: `Email is required`},
        isEmail: {msg: `Invalid email format`}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: `Password is required`},
        notEmpty: {msg: `Password is required`}
      }
    },
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};