'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Role, Photo}) {
      // define association here
      this.belongsToMany(Role, {
        through: "user_roles",
        foreignKey: "userId",
        otherKey: "roleId"
      });

      this.hasMany(Photo, { foreignKey: 'ownerId', as: 'photo' });
    }

    toJSON() {
      return {...this.get(), id: undefined, }
    }
  }

  User.init({

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

    username: { 
      type: DataTypes.STRING(30),
      unique: true,
    },

    email: { 
      type: DataTypes.STRING(30),
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
      type: DataTypes.STRING,
      required: true,
      allowNull:false,
      validate: {
        notEmpty: { 
          msg: "Password is required"
        }
      },
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
    modelName: 'User',
    tableName: "users"
  });
  
  return User;
};