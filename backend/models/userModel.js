
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
      },
      
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              isEmail: true,
              msg: "Invalid email ! "
          },
          unique: {
              args: true,
              msg: "Email address already in use !"
          },
      },

      pswd: {
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



  