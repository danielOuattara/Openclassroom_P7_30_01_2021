'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('comments', 'photoId', { 
          type:Sequelize.INTEGER,
          references: {
            model:'photos',
            key: 'id'
          },
          onDelete: 'CASCADE', 
      });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn('comments', 'photoId');
  }
};
