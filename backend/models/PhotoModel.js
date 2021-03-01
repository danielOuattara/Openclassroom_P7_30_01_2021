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
        onDelete:'cascade'
      });

      this.belongsToMany(Comment, { 
        through:    "photo_comments",
        foreignKey: "photoId",
        onDelete:'cascade'
      });

      
      this.belongsToMany(Like, { 
        through:    "photo_likes",
        foreignKey: "photoId",
        onDelete:'cascade'
      });

    }
    toJSON() {
      return {...this.get(), id: undefined, userId: undefined }
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
      required: true,
      validate: {
        notEmpty: { msg: "Title cannot be empty"},
        not: /[\[\]<>=0]+/gi  //  Restriction from  using characters:  [ \ [ \ ] < > = 0 ]
      },
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        notEmpty: { msg: "iamgeUrl can not be empty"},
        againstInjection(imageUrl) {
          const pattern =  /[\[\]<>=0]+/gi;  // do not trust user input !
          if ( pattern.test(imageUrl) ) throw new Error("Fill in text Invalid !");  //  Restriction from  using characters:  [ \ [ \ ] < > = 0 ]
        },
      },
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  }, 
  
  {
    sequelize,
    modelName: 'Photo',
    tableName:'photos',
  });
  return Photo;
};