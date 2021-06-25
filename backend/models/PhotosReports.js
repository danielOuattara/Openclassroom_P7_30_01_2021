'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhotosReports extends Model {
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
  
  PhotosReports.init({
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
    modelName: 'PhotosReports',
    tableName: 'photos_reports'
  });
  return PhotosReports;
};