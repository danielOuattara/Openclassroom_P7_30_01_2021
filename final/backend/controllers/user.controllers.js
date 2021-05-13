
const config = require("./../config/auth.config.js");
const db = require("./../models");
const { User, Role, Photo } = require('./../models');
// const { Op } = require('sequelize')
const Op = db.Sequelize.Op;
const model = require("./../models");


// exports.allAccess = (req, res) => res.status(200).send(" Public Content !");  // for public access
// exports.userBoard = (req, res) => res.status(200).send("User Content !");  //  for loggedin users (role: user/moderator/admin)
// exports.moderatorBoard = (req, res) => res.status(200).send("Moderator Content !");  // for users having moderator role
// exports.adminBoard = (req, res) => res.status(200).send("Admin Content !");  // for users having admin role



exports.userBoard = (req, res) => res.status(200).send("User Content !"); 
// exports.moderatorBoard = (req, res) => res.status(200).send("Moderator Content !");  // for users having moderator role
exports.adminBoard = (req, res) =>  {
      if(!req.userRoles.includes("ROLE_ADMIN")) {
      return res.status(403).send( {message:`Access Denied` })
    }
  res.status(200).send("Admin Content !");  
}
// ---------------------------------------------------------------------------------------------------------------

exports.getOneUser = (req, res, next) => {
    User.findOne( { 
      where: {uuid : req.params.userUuid},
      // include: 'photos',
      // include: 'comments'
    })
    .then( user => res.status(200).json(user))
    .catch( err => res.status(500).send( { message: err.message || `Error while retrieving Tutorial id = ${uuid}`} ))
  };

// ---------------------------------------------------------------------------------------------------------------

exports.getAllUsers = (req, res, next) => {
  User.findAll( {
    include: ['photos', 'comments', 'likes'],
    // include:' comments',
    // include: 'likes'
  })
  .then( users => res.status(200).json(users))
  .catch( error => res.status(400).json( {error: error.message} ));
}

// ---------------------------------------------------------------------------------------------------------------

exports.updateUser = (req, res, next) => {
  const userObject = req.file ? 
  {
    ...JSON.parse(req.body.user),  //si update d'image 
    avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}` 
  }
  :   
  {
    ...req.body // sinon 
    //...JSON.parse(req.body.user), pourquoi pas cette forme meme si pas update image ??? 
  }

  User.findOne({ where: { uuid: req.params.userUuid } })
  .then( user => {

    if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
      return res.status(403).json( {error: "Acces Denied !" } )  
    }

    if(req.files) {
      const filename = user.imageUrl.split('/images/')[1];
      fs.unlink( `images/${filename}`, () => {
        user.update( userObject )
        .then( num => {
          if (num == 1) {
            res.status(201).send({message: "User successfully updated ! "})
          } 
        })
        .catch( err => res.status(500).json( {message: err.message || "ERROR: Update Failed"} )) 
      })
      
    } else {
      user.update( userObject, {
        where: { uuid: req.params.userUuid }
      })
      .then( () => res.status(201).send({message: "User successfully updated ! "}))
      .catch( error => res.status(500).json( {error: error.message} )) 
      }
  })
}
  
  // ---------------------------------------------------------------------------------------------------------------