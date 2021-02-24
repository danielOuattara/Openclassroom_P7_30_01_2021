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
  
      userName: {
        type: Sequelize.STRING(30),
        unique: true,
      },
      
      email: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull:false,
      },
  
      password: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
  
      gender: {
        type: Sequelize.ENUM,
        values: ["homme", "femme", "autre"],
      },
  
      age: {
        type: Sequelize.INTEGER(2).UNSIGNED,  // 2 chiffres ?
      },
  
      department: {
        type: Sequelize.STRING(20),
      },
  
      avatar: {
        type: Sequelize.STRING,
      },
  
      aboutMe:    {
        type: Sequelize.STRING,
      },

      roleId: {  
        type: Sequelize.INTEGER,
        allowNull: false
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