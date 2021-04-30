'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:*/
      await queryInterface.bulkInsert('roles', [
        {
          id: 1,
          name: 'user',
        },
        {
          id: 2,
          name: 'moderator',
        },
        {
          id: 3,
          name: 'admin',
        },
         
      ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('Role', null, {});
  }
};
