'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Photo}) {
      // define association here
      this.belongsTo(User, {
        foreignKey:'userId', 
        as: 'user',
        onDelete:'cascade',
      
      });

      this.belongsToMany(Photo, { 
        through:    "photo_likes",
        foreignKey: "likeId",
        onDelete:'cascade',
      });

    }
    toJSON() {
      return {...this.get(), id: undefined, userId: undefined } // Hide every id
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

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  }, 
   
  {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
  });
  return Likes;
};