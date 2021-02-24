'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
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

  Roles.init({

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
    },
  }, 
  
  {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles',
  });
  return Roles;
};