
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {

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
          allowNull: false,
          unique: true,
      },

      password: {
          type: Sequelize.STRING(30),
          allowNull: false
      },
      
        gender: {
          type: Sequelize.STRING(1),
      },

      age: {
          type: Sequelize.INTEGER,
      },

      department: {
          type: Sequelize.STRING(30),
      },

      avatar: {
        type: Sequelize.STRING,
      },

      aboutme: {
        type: Sequelize.STRING,
      }

});
  
    return User;
  };



  