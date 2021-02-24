'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Photos.init({

    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  }, 
  
  {
    sequelize,
    modelName: 'Photos',
    tableName:'photos',
  });
  return Photos;
};