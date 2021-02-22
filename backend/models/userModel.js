// const { validator } = require("sequelize/types/lib/utils/validator-extras");

const validator = require('validator');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {

      firstName: {
        type: Sequelize.STRING,
     },

     lastName: {
       type: Sequelize.STRING,
      },

      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          // unique: {
            // args: true,
            // msg: "Email address already in use !"
        // },
          // validate: [ validator.validate, 'Invalid email']
      },

      password: {
          type: Sequelize.STRING,
          allowNull: false
      },
      
        gender: {
          type: Sequelize.STRING(1),
      },

      age: {
          type: Sequelize.INTEGER,
      },

      departement: {
          type: Sequelize.STRING,
      },


      accountCreationDate: {
          type: Sequelize.DATE,
      },


});
  
    return User;
  };



  