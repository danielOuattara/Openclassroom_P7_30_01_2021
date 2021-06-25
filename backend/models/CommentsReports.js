'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentsReports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Comment}) {
      // define association here

      this.belongsTo( User, {
        foreignKey: "ownerId",
        as: 'owner',
      })

      this.belongsTo( Comment, {
        foreignKey: "commentId",
        as: 'comment',
      })
    }

    toJSON() {
      return {...this.get(), id: undefined} 
    }
  }

  CommentsReports.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    message:  {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },  
  }, {
    sequelize,
    modelName: 'CommentsReports',
    tableName: 'comments_reports',
  });
  return CommentsReports;
};