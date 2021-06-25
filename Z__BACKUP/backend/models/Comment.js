'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Photo}) {
      // define association here
      this.belongsTo( User, {
        foreignKey: "ownerId",
        as: 'owner',
      })

      this.belongsTo( Photo, {
        foreignKey: "photoId",
        as: 'photo',
      })
    }

    toJSON() {
      return {...this.get(), id: undefined} 
    }
  }
  Comment.init({

    uuid:  {
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },

    content:  {
      type:DataTypes.STRING,
      allowNull: false
    },
  }, 
  
  {
    sequelize,
    modelName: 'Comment',
    tableName:'comments'
  });
  return Comment;
};