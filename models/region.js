'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Region.hasMany(models.Exploration, {
        onDelete: "cascade",
        onUpdate: "cascade"
      })
    }
  }
  Region.init({
    name: DataTypes.STRING,
    time: DataTypes.INTEGER,
    coin: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    chance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Region',
  });
  return Region;
};