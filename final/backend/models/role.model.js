'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsToMany(User, {
        through: "user_roles",
        foreignKey: "roleId",
        otherKey: "userId"
      })
    }
  }

  Role.init({

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    name:  { 
      type: DataTypes.STRING,
      
    },
  }, 
  
  {
    sequelize,
    modelName: 'Role',
    tableName: "roles",
  });
  return Role;
};