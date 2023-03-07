'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let dataSeed = require('../data.json').EnemyPokemons
    .map(el => {
     el.createdAt = el.updatedAt = new Date()
     return el
    })
    await queryInterface.bulkInsert('EnemyPokemons', dataSeed)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('EnemyPokemons')
  }
};
