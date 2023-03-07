'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserPokemons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      hp: {
        type: Sequelize.INTEGER
      },
      atk: {
        type: Sequelize.INTEGER
      },
      exp: {
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.INTEGER
      },
      UserId:  {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserPokemons',
          key: 'id'
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserPokemons');
  }
};