'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Photo, Like, Comment, Role}) {
      // define association here
      this.hasMany(Photo,  { foreignKey: 'ownerId', as: 'photo' });
      this.hasMany(Like,   { foreignKey: 'ownerId', as: 'like' });
      this.hasMany(Comment,{ foreignKey: 'ownerId', as: 'comment' });
      
      this.belongsToMany(Role, { 
        through:    "user_roles",
        foreignKey: "userId",
        otherKey:   "roleId",
      });

      // this.belongsToMany(Role, { 
      //   through:    "user_roles",
      //   foreignKey: "userId",
      //   // otherKey:   "roleId",
      // });
    }

    toJSON() {
      return {...this.get(), id: undefined } // Hide every id
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

    userName: {
      type: DataTypes.STRING(30),
      unique: true,
    },
    
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull:false,
      validate: {
        notNull: { msg: "Un Email valide est requis"},
        notEmpty: { msg: "Un Email non vide est requis"}
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: { msg: "Un mot de passe valide est requis"},
        notEmpty: { msg: "Un mot de passe non vide est requis"}
      },
      
    },

    gender: {
      type: DataTypes.ENUM,
      values: ["homme", "femme", "autre"],
    },

    age: {
      type: DataTypes.INTEGER(2).UNSIGNED, 
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

    // roleId: {  
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },

    
  },
  
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};