
const db = require("./../models");
const { sequelize, User, Role, Photo, Comment, Like } = require('./../models');
const Op = db.Sequelize.Op;
const fs = require("fs");

//-----------------------------------------------------------------------------------------


exports.photoLike = (req, res) => {
   Photo.findOne({ where: { uuid: req.params.photoUuid} })
   .then( photo => {
      if(!photo) return res.status(404).send( {message:`Photo unknown` })
      Like.findOne({ 
        where: {
          [Op.and]: [ 
            {ownerId: req.userId},
            {photoId: photo.id}
          ]
        }
      })
      .then(like => {

        if(!like) {   // like creation
          Like.create({
            value: req.body.value,
            ownerId: req.userId,
            photoId: photo.id
          })
          .then( () => res.status(200).json({ message: ` Likes successfully sent on photo !`}))
          .catch( err => res.status(404).send({ message:err.message ||`Error when sending likes to Photo` }));
        }

        if(like) { // like update
          like.update({value: req.body.value})
          .then( () => res.status(200).json({ message: ` Likes successfully updated on photo !`}))
          .catch( err => res.status(404).send({ message:err.message ||`Error when sending likes to Photo` }));
        }
      })
      .catch()
   })
   .catch(err => res.status(500).send({ message: err.message || "Server error on commenting photos."}) )
}

