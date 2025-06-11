'use strict'
const { features } = require('../utils/constant')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Features', features)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Features', null, {})
  },
}
