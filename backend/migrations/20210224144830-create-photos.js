'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('photos', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },

      title: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
  
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('photos');
  }
};