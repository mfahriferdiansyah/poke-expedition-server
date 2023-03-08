'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Explorations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isBattle: {
        type: Sequelize.BOOLEAN
      },
      rewardCoin: {
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.INTEGER
      },
      RegionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Regions',
          key: 'id'
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      UserPokemonId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserPokemons',
          key: 'id'
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      EnemyPokemonId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'EnemyPokemons',
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
    await queryInterface.dropTable('Explorations');
  }
};