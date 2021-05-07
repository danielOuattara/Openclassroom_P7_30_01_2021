'use strict';

const { defaultValueSchemable } = require("sequelize/types/lib/utils");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },

      content: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};