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
      this.belongsTo(User, {
        foreignKey:'userId', 
        as: 'user',
        onDelete:'cascade',
      });

      this.belongsToMany(Photo, { 
        through:    "photo_comments",
        foreignKey: "commentId",
        onDelete:'cascade',
      });

    }

    toJSON() {
      return {...this.get(), id: undefined, userId: undefined } // Hide every id
    }
 
  }

  Comment.init({

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    content: {
      type: DataTypes.STRING,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
  });
  return Comment;
};