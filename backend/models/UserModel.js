'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      return {...this.get(), id: undefined } // Hide every id
    }



  }

  Users.init({

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    firstName: {
      type: DataTypes.STRING(30),
    },

    lastName: {
      type: DataTypes.STRING(30),
    },

    userName: {
      type: DataTypes.STRING(30),
      unique: true,
    },
    
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull:false,
    },

    password: {
      type: DataTypes.STRING(30),
      allowNull:false
    },

    gender: {
      type: DataTypes.ENUM,
      values: ["homme", "femme", "autre"],
    },

    age: {
      type: DataTypes.INTEGER(2).UNSIGNED,  // 2 chiffres ?
    },

    department: {
      type: DataTypes.STRING(20),
    },

    avatar: {
      type: DataTypes.STRING,
    },

    aboutMe:    {
      type: DataTypes.STRING,
    },
    
  },
  
  {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
  });
  return Users;
};