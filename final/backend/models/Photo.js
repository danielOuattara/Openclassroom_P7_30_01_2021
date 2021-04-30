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
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'userId', 
        as:         'user',
        onDelete:'cascade'
      });
    }
  }

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

  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};