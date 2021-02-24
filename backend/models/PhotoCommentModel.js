'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhotoComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      return {...this.get(), id: undefined } // Hide every id
    }
 
  }

  PhotoComments.init({

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    content: {
      type: DataTypes.STRING,
    },

    comment_userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  
  {
    sequelize,
    modelName: 'PhotoComments',
    tableName: 'photos_comments',
  });
  return PhotoComments;
};