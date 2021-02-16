
const dbConfig  = require('./../config/dbConfig.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {

    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max:     dbConfig.pool.max,
      min:     dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle:    dbConfig.pool.idle
    }
  });

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user  = require('./userModel.js')(sequelize, Sequelize);
db.photo = require('./photoModel.js')(sequelize, Sequelize);

db.role = require('./../models/roleModel.js')( sequelize, Sequelize);



db.role.belongsToMany(db.user, {
  through:    'user_roles',
  foreignKey: 'userId',
  otherKey:   'roleId'
});


db.user.belongsToMany(db.role, {
  through:    'user_roles',
  foreignKey: 'userId',
  otherKey:   'roleId'
});

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;

try {
 sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}