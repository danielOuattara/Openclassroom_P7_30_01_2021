'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Role}) {
      // define association here
      this.belongsToMany(Role, {
        through: "user_roles",
        foreignKey: "userId",
        otherKey: "roleId"
      })
    }
  }

  User.init({
    username: { 
      type: DataTypes.STRING,
      required: true,
      allowNull:false,
      validate: {
        notEmpty: { msg: "Username is required"}
      },
    },

    email: { 
      type: DataTypes.STRING,
      required: true,
      unique: true,
      allowNull:false,
      validate: {
        notEmpty: { msg: "Email is required"},
        isEmail: true
      },
    },

    password:  {
      type: DataTypes.STRING,
      required: true,
      allowNull:false,
      validate: {
        notEmpty: { msg: "Password is required"}
      },
    }
  }, 
  
  {
    sequelize,
    modelName: 'User',
    tableName: "users"
  });
  return User;
};