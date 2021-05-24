'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( { User, Comment, Like}) {
      // define association here
      this.belongsTo( User, {
        foreignKey: "ownerId",
        as: 'owner',
      })

      this.hasMany(Comment, { 
        foreignKey: 'photoId', 
        as: 'comments',
      });

      this.hasMany(Like, { 
        foreignKey: 'photoId', 
        as: 'likes',
      });
    }

    toJSON() {
      return {...this.get(), id: undefined} 
    }


  }
  Photo.init({

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
    
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
        required: true,
        validate: {
          notEmpty: { msg: "Title cannot be empty"},
          not: /[\[\]<>=01]+/gi  //  Restriction from  using characters:  [ \ [ \ ] < > = 0 ]
        },
      },

      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
          notEmpty: { msg: "iamgeUrl can not be empty"},
          // againstInjection(imageUrl) {
          //   const pattern =  /[\[\]<>=0]+/gi;  // do not trust user input !
          //   if ( pattern.test(imageUrl) ) throw new Error("Fill in text Invalid !");  //  Restriction from  using characters:  [ \ [ \ ] < > = 0 ]
          // },
        },
      },

  }, 
  
  {
    sequelize,
    modelName: 'Photo',
    tableName:"photos"
  });
  return Photo;
};