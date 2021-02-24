'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_likes_photos', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      userLikes: {
        type: Sequelize.INTEGER(1).UNSIGNED,
      },
  
      userDislikes: {
        type: Sequelize.INTEGER(1).UNSIGNED,
      },
  
      likes_owner_id: {  // ??
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
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
    await queryInterface.dropTable('users_likes_photos');
  }
};