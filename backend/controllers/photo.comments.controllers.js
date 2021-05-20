
const db = require("./../models");
const { sequelize, User, Role, Photo, Comment, Like } = require('./../models');
const Op = db.Sequelize.Op;
const fs = require("fs");

//-----------------------------------------------------------------------------------------

exports.createComment = (req, res) => {
  Photo.findOne({ where: { uuid: req.params.photoUuid } })
  .then( photo =>  {
    Comment.create({
      content: req.body.content, 
      ownerId: req.userId, 
      photoId: photo.id 
    })
    .then(() => res.status(200).json({ message: `Comment successfully created !`}))
    .catch(err => res.status(403).json({ message: err.message }))
  })
  .catch( err => res.status(500).json({ message: err.message || `Server Error ! Try again Soon `}) )
}

// ----------------------------------------------------------------------------------------

exports.getPhotoAllComment = (req, res) => {
  Photo.findOne({ where: { uuid: req.params.photoUuid } })
  .then( photo =>  {
    if(!photo) {
      return res.status(404).send( {message:`Photo ${req.params.photoUuid} not found` })
    }
    Comment.findAll({
      where: { photoId: photo.id },
      include: ["owner", 'photo']
    })
    .then( comments => res.status(200).json(comments))
    .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
  })
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}

// ----------------------------------------------------------------------------------------

exports.getOneComment = (req, res) => {
  Photo.findOne({ where: { uuid: req.params.photoUuid }  })
  .then( photo =>  {
    if(!photo) {
      return res.status(404).send( {message:`Photo ${req.params.photoUuid} not found` })
    }
    Comment.findOne({ where: { uuid: req.params.commentUuid }  })
    .then( comment =>  {
      if (!comment) {
        return res.status(404).send( {message:`Photo ${req.params.photoUuid} not found ` })
      }
      res.status(200).json(comment)
    })
    .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
  })
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}

// ----------------------------------------------------------------------------------------

exports.updateOneComment = (req, res) => {
  const commentObject = {...req.body}
  Comment.findOne({ where: {uuid: req.params.commentUuid}})
  
  .then( comment => {
      if(comment.ownerId!== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
        return res.status(403).json( {error: "Access Denied ! " } )  
      }
      if (!comment) {
        return res.status(404).send( {message:`Photo ${req.params.photoUuid} not found ` })
      }
      comment.update(commentObject)
      .then( () => res.status(201).send({message: "Comment successfully updated ! "}))
      .catch( err => res.status(500).json( { message: err.message || "ERROR: Update Failed"} )) 
  })
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}
// ------------------------------------------------------------------------------------------------

exports.deleteOneComment = (req, res) => {
  Comment.findOne({ where: {uuid: req.params.commentUuid}})
  .then( comment => {
      if (!comment) {
        return res.status(404).send( {message:`Comment not found ` })
      }
      if(comment.ownerId!== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
        return res.status(403).json( {error: "Access Denied ! " } )  
      }
      comment.destroy()
      .then(() => res.status(201).send({message: "Comment successfully deleted !"}))
      .catch( err => res.status(500).json( { message: err.message || "ERROR: Update Failed"} )) 
  })
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}

// ----------------------------------------------------------------------------------------

exports.deleteAllCommentFromOnePhoto = (req, res) => {
  Photo.findOne({ where: { uuid: req.params.photoUuid } })
  .then( photo =>  {
    if(!photo) {
      return res.status(404).send( {message:`Photo not found` })
    }
    if(photo.ownerId != req.userId && !req.userRoles.includes("ROLES_ADMIN")) {
      return res.status(403).json( {error: "Access Denied ! Violation reported using your IP address" } )  
    }
    Comment.destroy({ 
      where: { photoId: photo.id },
      truncate: false 
    })
    .then( num =>  {
      if(num === 0) {
        return res.status(404).send({message:`No comment found`})
      }
      res.status(201).send({message: `${num} comment(s) were successfully deleted`})
    })
    .catch(() => res.status(500).json({ message:` Server Error ! Try again Soon 1 `}))
  })
  .catch(() => res.status(500).json({ message:` Server Error ! Try again Soon 2 `}))
}

// ----------------------------------------------------------------------------------------

exports.deleteAllCommentFromOneUser = (req, res) => {
  User.findOne( {where: { uuid: req.params.userUuid}})
  .then( user => {  
    if(!user) {
      return res.status(404).send( {message:`User not found` })
    }
     if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")) {
      return res.status(403).json( {error: "Access Denied ! " } )  
     } 
     Comment.destroy({
       where: { ownerId: user.id},
       truncate: false,      
      })
     .then( num => {
        if (num === 0) {
          return res.status(404).send({message:`No comment found for this user`})
        } 
        res.status(201).send({ message: `${num} comment(s) from user successfully deleted `})
      })
      .catch(() => res.send({ message:`Server Error ! Try again Soon 1`}))
  })
  .catch(() => res.status(500).json({ message:` Server Error ! Try again Soon 2 `})) 
}
// ----------------------------------------------------------------------------------------

