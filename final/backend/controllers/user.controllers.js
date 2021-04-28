
const config = require("./../config/auth.config.js");
const db = require("./../models");
const { User, Role } = require('./../models');
// const { Op } = require('sequelize')
const Op = db.Sequelize.Op;


exports.allAccess = (req, res) => {
    res.status(200).send(" Public Content !");  // for public access
};


exports.userBoard = (req, res) => {
    res.status(200).send("User Content !");  //  for loggedin users (role: user/moderator/admin)
};


exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content !");  // for users having moderator role
};


exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content !");  // for users having admin role
}


exports.getOneUser = (req, res, next) => {
    const uuid = req.params.uuid;
    User.findOne( { where: {uuid}  })
    .then( user => res.status(200).json(user))
    .catch( err => res.status(500).send( { message: err.message || `Error while retrieving Tutorial id = ${id}`} ))
  };


exports.getAllUsers = (req, res, next) => {
  User.findAll()
  .then( users => res.status(200).json(users))
  .catch( error => res.status(400).json( {error} ));
  }

  
exports.updateUser = (req, res, next) => {}