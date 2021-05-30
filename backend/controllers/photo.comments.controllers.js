
const db = require("./../models");
const { sequelize, User, Role, Photo, Comment, Like } = require('./../models');
const Op = db.Sequelize.Op;
const fs = require("fs");

//-----------------------------------------------------------------------------------------

exports.createComment = async (req, res) => {
    try {
        const photo = await Photo.findOne({ where: { uuid: req.params.photoUuid } })
        if(!photo) {
            return res.status(404).send(`Photo not found`)
        }
        await Comment.create({
            content: req.body.content, 
            ownerId: req.userId, 
            photoId: photo.id 
        })
        res.status(200).send(`Comment successfully created !`)
  } catch(err) {
     res.status(500).json(err.message)
  }
}

// ----------------------------------------------------------------------------------------

exports.getPhotoAllComment = (req, res) => {
    Photo.findOne({ where: { uuid: req.params.photoUuid } })
    .then( photo =>  {
      if(!photo) {
        return res.status(404).send(`Photo not found`)
      }
      Comment.findAll({
        where: { photoId: photo.id },
        include: ["owner", 'photo']
      })
      .then( comments => res.status(200).json(comments))
      .catch( err => res.status(401).json(err.message))
    }) 
    .catch( err => res.status(500).json(err.message))
}

// ----------------------------------------------------------------------------------------

exports.getOneComment =  async (req, res) => {
    try {
        const photo = await Photo.findOne({ where: { uuid: req.params.photoUuid } })
        if(!photo) {
            return res.status(404).send(`Photo not found`)
        }
        const comment =  await Comment.findOne({ where: { uuid: req.params.commentUuid }  })
        if (!comment) {
              return res.status(404).send(`Comment not found `)
        }
        return res.status(200).json(comment)
    } catch(err) {
      res.status(500).json(err.message)
    }
}

// ----------------------------------------------------------------------------------------

exports.updateOneComment = (req, res) => {
    const commentObject = {...req.body}
    Comment.findOne({ where: {uuid: req.params.commentUuid}})
    .then( comment => {
        if (!comment) {
          return res.status(404).send(`Comment not found `)
        }
        if(comment.ownerId !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
          return res.status(403).send("Access Denied ! ");  
        }
        comment.update(commentObject)
        .then( () => res.status(201).send("Comment successfully updated ! "))
        .catch( err => res.status(401).json(err.message)) 
    })
    .catch( err => res.status(500).json(err.message))
}
// ------------------------------------------------------------------------------------------------

exports.deleteOneComment = (req, res) => {
    Comment.findOne({ where: {uuid: req.params.commentUuid}})
    .then( comment => {
        if (!comment) {
          return res.status(404).send(`Comment not found `)
        }
        if(comment.ownerId!== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
          return res.status(403).sen("Access Denied ! ")  
        }
        comment.destroy()
        .then(() => res.status(201).send("Comment successfully deleted !"))
        .catch( err => res.status(401).send(err.message)) 
    })
    .catch( err => res.status(500).send(err.message))
}

// ----------------------------------------------------------------------------------------

exports.deleteAllCommentFromOnePhoto = async (req, res) => {
    try {
        const photo = await Photo.findOne({ where: { uuid: req.params.photoUuid } })
        if(!photo) {
            return res.status(404).send( {message:`Photo not found` })
        }
        if(photo.ownerId != req.userId && !req.userRoles.includes("ROLES_ADMIN")) {
            return res.status(403).send("Access Denied !")  
        }
        const num = await Comment.destroy({ 
            where: { photoId: photo.id },
            truncate: false 
        })
        if(num === 0) {
            return res.status(404).send(`No comment found`)
        }
        return res.status(201).send(`${num} comment(s) successfully deleted`)
    
    } catch(err) {
      res.status(500).json(` Server Error ! Try again Soon 2 `)
    }
}

// ----------------------------------------------------------------------------------------

exports.deleteAllCommentFromOneUser =  async (req, res) => {
    try {
        const user = await User.findOne( {where: { uuid: req.params.userUuid}})  
        if(!user) {
            return res.status(404).send( {message:`User not found` })
        }
        if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")) {
            return res.status(403).send("Access Denied ! ")  
        } 
        const num =  await Comment.destroy({
            where: { ownerId: user.id},
            truncate: false,      
        })
        if (num === 0) {
            return res.status(404).send(`No comment found for this user`)
        } 
        res.status(201).send(`${num} comment(s) successfully deleted `)       
    
    } catch(err) {
       return res.status(500).json(err.message) 
    }
}


// exports.deleteAllCommentFromOneUser = (req, res) => {
//   User.findOne( {where: { uuid: req.params.userUuid}})
//   .then( user => {  
//     if(!user) {
//       return res.status(404).send( {message:`User not found` })
//     }
//      if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")) {
//       return res.status(403).json( {error: "Access Denied ! " } )  
//      } 
//      Comment.destroy({
//        where: { ownerId: user.id},
//        truncate: false,      
//       })
//      .then( num => {
//         if (num === 0) {
//           return res.status(404).send({message:`No comment found for this user`})
//         } 
//         res.status(201).send(`${num} comment(s) successfully deleted `)
//       })
//       .catch(() => res.send(`Server Error ! Try again Soon 1`))
//   })
//   .catch(() => res.status(500).json({ message:` Server Error ! Try again Soon 2 `})) 
// }
// ----------------------------------------------------------------------------------------

