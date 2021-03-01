'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


   await queryInterface.bulkInsert('users', [
    {
     userName: 'user_1',
     email: 'user_1@test.com',
     password:'user_1@test.com' ,
     uuid: 'b43c22f6-5616-4c7f-e6b1-1cfe134f7dc1',
     createdAt:'2021-02-25T02:46:36.000',
     updatedAt:'2021-02-25T02:46:36.000',
    //  roles: ["user", "admin"],
     
   },

    {
     userName: 'user_2',
     email: 'user_2@test.com',
     password: 'user_2@test.com',
     uuid: '1f678-3a343-2353b-653eb3725de',
     createdAt:'2021-02-25T02:46:36.000',
     updatedAt:'2021-02-25T02:46:36.000',
    //  roles: ["user", "admin"],
     
   },

    {
     userName: 'user_3',
     email: 'user_3@test.com',
     password:'user_1@test.com',
     uuid: '7777ef3a-7d26-4e38-8569-501be6cdc3f9',
     createdAt:'2030-12-25T02:46:36.000',
     updatedAt:'2030-12-25T02:46:36.000',
    //  roles: ["user", "user"],
     
   },

    {
     userName: 'user_4',
     email: 'user_4@test.com',
     password:'user_4@test.com',
     uuid: 'a1b1ef3a-7d26-4e38-8569-501be6cdc3f9',
     createdAt:'1999-12-25T02:46:36.000',
     updatedAt:'1999-12-25T02:46:36.000',
    //  roles: ["user", "user"],
     
   },

    {
     userName: 'user_5',
     email: 'user_5@test.com',
     password:'user_5@test.com',
     uuid: '1111ef3a-7d26-4e38-9658-501be6cdc3f9',
     createdAt:'1996-12-25T02:46:36.000',
     updatedAt:'1996-12-25T02:46:36.000',
    //  roles: ["user", "user"],
     
   },
  
  ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
