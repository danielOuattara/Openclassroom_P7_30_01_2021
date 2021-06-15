'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('likes', 'ownerId', { 
          type:Sequelize.INTEGER,
          references: {
            model:'users',
            key: 'id'
          },
          onDelete: 'CASCADE', 
      });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn('likes', 'ownerId');
  }
};
