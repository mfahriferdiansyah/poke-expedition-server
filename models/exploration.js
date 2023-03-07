'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exploration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exploration.belongsTo(models.User)
      Exploration.belongsTo(models.UserPokemon)
      Exploration.belongsTo(models.Region)
      Exploration.belongsTo(models.EnemyPokemon)
    }
  }
  Exploration.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    isBattle: DataTypes.BOOLEAN,
    time: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    UserPokemonId: DataTypes.INTEGER,
    EnemyPokemonId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Exploration',
  });
  return Exploration;
};