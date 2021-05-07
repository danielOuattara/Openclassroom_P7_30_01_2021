
const config = require("./../config/auth.config.js");
const db = require("./../models");
const { User, Role, Photo } = require('./../models');
// const { Op } = require('sequelize')
const Op = db.Sequelize.Op;
const model = require("./../models");


exports.allAccess = (req, res) => res.status(200).send(" Public Content !");  // for public access

exports.userBoard = (req, res) => res.status(200).send("User Content !");  //  for loggedin users (role: user/moderator/admin)

exports.moderatorBoard = (req, res) => res.status(200).send("Moderator Content !");  // for users having moderator role

exports.adminBoard = (req, res) => res.status(200).send("Admin Content !");  // for users having admin role



exports.getOneUser = (req, res, next) => {
    const uuid = req.params.uuid;
    User.findOne( { 
      where: {uuid},
      include: 'photos'
    })
    .then( user => res.status(200).json(user))
    .catch( err => res.status(500).send( { message: err.message || `Error while retrieving Tutorial id = ${uuid}`} ))
  };


exports.getAllUsers = (req, res, next) => {
  User.findAll( {
      include: 'photos'
      // include: [{ model: Photo, as:'photos'}]
  })
  .then( users => res.status(200).json(users))
  .catch( error => res.status(400).json( {error: error.message} ));
  }

//-------------------------------------------------------------------

exports.updateUser = (req, res, next) => {
  console.log(req)
  
  const userObject = req.file ? 
  {
    ...JSON.parse(req.body.user),  //si update d'image 
    avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
  }
  :  
  {
    ...req.body // sinon 
  }
  
  console.log("test ===" , userObject)
    if(req.files) {

        User.findOne({ where: { uuid: req.params.uuid } })
        .then( user => {
            if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
                return res.status(403).json( {error: "Acces Denied ! Violation reported using your IP address" } )  
            }
            const filename = user.imageUrl.split('/images/')[1];
            fs.unlink( `images/${filename}`, () => {
                user.update( userObject )
                    .then( num => {
                        if (num == 1) {
                          res.status(201).send({message: "User successfully updated ! "})
                        } 
                    })
                    .catch( error => res.status(500).json( {ERROR: "Update Failed"} )) 

            })
      })
      .catch( error => res.status(500).json( {error: error.message} )) 
      


    } else {
      User.update( userObject, {
        where: { uuid: req.params.uuid }
      })
      .then( user => {
        res.status(201).send({message: "User successfully updated ! "})
      })
      .catch( error => res.status(500).json( {error: error.message} )) 
    }
}