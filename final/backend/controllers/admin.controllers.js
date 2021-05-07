

const bcrypt = require("bcryptjs");
const config = require("./../config/auth.config.js");
const db = require("./../models");
const { sequelize, User, Role } = require('./../models');
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken")


// ---------------------------------------------------------------------------------

exports.deleteUser = (req, res, next) => {  // by Admin
  const uuid = req.params.userUuid;

  User.findOne({ where: { uuid } })
  .then( user => {
      if(!user) {
          return res.status(401).json( {error: " User Unknown !" } )  
      }

      User.destroy({ where: { uuid } })
      .then(() => res.status(200).json({ message: "Account deleted !" }))
      .catch((err) => res.status(403).json({ err }))
    })
  .catch( error => res.status(500).json( {error: error.message} )) 

  };
  