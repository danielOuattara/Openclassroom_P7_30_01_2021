'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Role, Photo, Comment, Like}) {
      // define association here
      this.belongsToMany(Role, {
        through: "user_roles",
        foreignKey: "userId",
        otherKey: "roleId"
      });

      this.hasMany(Photo, { 
        foreignKey: 'ownerId', 
        as: 'photos',
      });

      this.hasMany(Comment, { 
        foreignKey: 'ownerId', 
        as: 'comments',
      });

      this.hasMany(Like, { 
        foreignKey: 'ownerId', 
        as: 'likes',
      });

    }

    // toJSON() {
    //   return {...this.get(), }
    // }
  }

  User.init({

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    
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
      allowNull: true,
      unique: true,
      validate: {
        msg: "This username is already in use, please choose anoyther one."
      }
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