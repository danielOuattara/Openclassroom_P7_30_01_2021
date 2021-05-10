'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here

      this.belongsTo( User, {
        foreignKey: "ownerId",
        as: 'owner',
      })


    }
  };
  Comment.init({
    
    uuid:  {
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },

    content:  {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize,
    modelName: 'Comment',
    tableName: "comments"
  });
  return Comment;
};