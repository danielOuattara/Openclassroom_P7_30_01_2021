'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Photo, CommentsReports}) {
      // define association here

      this.belongsTo( User, {
        foreignKey: "ownerId",
        as: 'owner',
      })

      this.belongsTo( Photo, {
        foreignKey: "photoId",
        as: 'photo',
      })

      this.hasMany(CommentsReports, { 
        foreignKey: 'commentId', 
        as: 'comments_reports',
        onDelete: 'CASCADE',
      });
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
      allowNull: false,
      required: true,
    },
  }, 
  
  {
    sequelize,
    modelName: 'Comment',
    tableName:'comments'
  });
  return Comment;
};