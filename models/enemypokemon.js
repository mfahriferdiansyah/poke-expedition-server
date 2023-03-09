'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EnemyPokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EnemyPokemon.hasMany(models.Exploration)
    }
  }
  EnemyPokemon.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    type: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    atk: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EnemyPokemon',
  });
  return EnemyPokemon;
};