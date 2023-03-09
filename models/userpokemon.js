'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserPokemon.belongsTo(models.User)
      UserPokemon.hasMany(models.Exploration)
    }
  }
  UserPokemon.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    type: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    atk: DataTypes.INTEGER,
    exp: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserPokemon',
  });
  return UserPokemon;
};