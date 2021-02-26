'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Photo}) {
      // define association here
      this.belongsTo(User, {foreignKey:'ownerId', as: 'user'});

      this.belongsToMany(Photo, { 
        through:    "photo_likes",
        foreignKey: "likeUuid",
        otherKey:   "photoUuid",
      });

    }
    toJSON() {
      return {...this.get(), id: undefined, ownerId: undefined } // Hide every id
    }

  }

  Likes.init({

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    like: {
      type: DataTypes.INTEGER(1),
    },

    // ownerId: {  
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },

    // roleId: {  
    //   type: DataTypes.INTEGER.UNSIGNED,
    //   allowNull: false
    // },

  }, 
  
  
  {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
  });
  return Likes;
};