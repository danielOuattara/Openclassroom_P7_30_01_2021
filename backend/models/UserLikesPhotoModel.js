'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersLikesPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  UsersLikesPhoto.init({

    userLikes: {
      type: DataTypes.INTEGER(1).UNSIGNED,
    },

    userDislikes: {
      type: DataTypes.INTEGER(1).UNSIGNED,
    },

    likes_owner_id: {  // ??
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },

  }, 
  
  
  {
    sequelize,
    modelName: 'UsersLikesPhoto',
    tableName: 'users_likes_photos',
  });
  return UsersLikesPhoto;
};