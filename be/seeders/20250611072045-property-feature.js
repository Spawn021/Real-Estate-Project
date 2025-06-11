'use strict'
const { propertyFeatures } = require('../utils/constant')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PropertyFeatures', propertyFeatures)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PropertyFeatures', null, {})
  },
}
