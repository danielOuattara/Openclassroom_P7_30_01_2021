'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Comment, Like}) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'userId', 
        as:         'user',
      });

      this.belongsToMany(Comment, { 
        through:    "photo_comments",
        foreignKey: "photoId",
      });

      
      this.belongsToMany(Like, { 
        through:    "photo_likes",
        foreignKey: "photoId",
      });



    }
    toJSON() {
      return {...this.get(), id: undefined, ownerId: undefined }
    }
    
  }

  Photo.init({

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // ownerId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },

  }, 
  
  {
    sequelize,
    modelName: 'Photo',
    tableName:'photos',
  });
  return Photo;
};