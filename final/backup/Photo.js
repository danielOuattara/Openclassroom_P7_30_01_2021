'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'ownerId', 
        as:         'user',
        onDelete:'cascade'
      });

      // this.belongsToMany(Comment, { 
      //   through:    "photo_comments",
      //   foreignKey: "photoId",
      //   onDelete:'cascade'
      // });

      
      // this.belongsToMany(Like, { 
      //   through:    "photo_likes",
      //   foreignKey: "photoId",
      //   onDelete:'cascade'
      // });

    }
    toJSON() {
      return {...this.get(), id: undefined, userId: undefined }
    }
  }

  Photo.init({

    uuid:  {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
    },

    title:  {
      type:DataTypes.STRING(30),
    },

    imageUrl:  {
      type: DataTypes.STRING 
    },

    // ownerId:  {
    //   type: DataTypes.INTEGER 
    // },
  }, 
  
  {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};