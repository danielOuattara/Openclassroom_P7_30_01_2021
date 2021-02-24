'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhotoComment extends Model {
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

  PhotoComment.init({

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    content: {
      type: DataTypes.STRING,
    },

    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  
  {
    sequelize,
    modelName: 'PhotoComment',
    tableName: 'photos_comments',
  });
  return PhotoComment;
};