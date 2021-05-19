'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
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
        as: 'photos',
      })
    }
  };
  Like.init({
    uuid:  {
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },

    value:  {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },

  }, 
  
  {
    sequelize,
    modelName: 'Like',
    tableName:'likes',
  });
  return Like;
};