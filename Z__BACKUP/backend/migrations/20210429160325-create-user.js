'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },

      firstName: {
        type: Sequelize.STRING(30),
      },

      lastName: {
        type: Sequelize.STRING(30),
      },

      username: { 
        type: Sequelize.STRING(30),
        unique: true,
      },

      email: { 
        type: Sequelize.STRING(30),
        required: true,
        unique: true,
        allowNull:false,
        validate: {
          notEmpty: { 
            msg: "Email is required"
          },
          isEmail: true
        },
      },

      password:  {
        type: Sequelize.STRING,
        required: true,
        allowNull:false,
        validate: {
          notEmpty: { 
            msg: "Password is required"
          }
        },
      },
          
      avatar: {
        type: Sequelize.STRING,
      },

      aboutMe: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('users');
  }
};