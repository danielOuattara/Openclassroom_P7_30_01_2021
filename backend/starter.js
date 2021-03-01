
require('dotenv').config();

const {sequelize, Sequelize, Role} = require('./models');
const db = require("./models");
db.role = require("./models/RoleModel.js")(sequelize, Sequelize);
db.Role = require('./models/RoleModel.js')


const main = async (req, res, next) => {

    try {
      await db.sequelize.sync({force:true});
      console.log('   ===  Connected to groupomania_db !  === ')
    } catch (err) {
  
      console.log(err)
      return res.status(400).json(err)
    }
  
    adminRole();
    userRole();
  }
  
const adminRole = async (req, res, next) => {
  
    try {
      await Role.create({ id: 1, name: "user" });
    } catch (err) {
  
      console.log(err)
      return res.status(400).json(err)
    }
  }
  
  
 const userRole = async (req, res, next) => {
  
    try {
      await Role.create({ id: 2, name: "admin" });
    } catch (err) {
  
      console.log(err)
      return res.status(400).json(err)
    }
  }
  



