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
          uuid:"0aab5816-e8f7-4349-9e4e-cdaf08729fee " ,
          name: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          uuid:"e9fcbf74-7559-45df-97d1-7932ae01d55f" ,
          name: 'moderator',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          uuid:"c6db83ce-d17f-47ee-ad87-72110aa1d3b7" ,
          name: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
         
      ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('roles', null, {});
  }
};
