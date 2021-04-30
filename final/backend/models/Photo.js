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
    static associate(models) {
      // define association here
    }
  };
  Photo.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    
      title: {
        type: DataTypes.STRING(30)
      },

      imageUrl: {
        type: DataTypes.STRING

      },

      ownerId: {
        type: DataTypes.UUID
      }
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};