
const db = require("./../models");
const { sequelize, User, Role, Photo, Comment, Like } = require('./../models');
const Op = db.Sequelize.Op;
const fs = require("fs");

//-----------------------------------------------------------------------------------------

exports.addPhoto = (req, res)=> {

    const image = { 
        title: req.body.title, 
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    };

    if(!image.title) {
      return res.status(400).send({message: `Title can not be empty`});
    }

    if(!image.imageUrl) {
      return res.status(400).send({message: `imageUrl can not be empty`});
    }
    
     Photo.create( {...image, ownerId: req.userId } )
     .then( photo =>  {
       console.log(photo.toJSON())
       res.status(200).json({message: 'Photo Successsfully Posted !'})})
     .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )

};

//-----------------------------------------------------------------------------------------

exports.getAllPhoto = (req, res) => {
  Photo.findAll({
    include:  ['owner','comments'] 
    // include:'comments'  
  })
  .then( photos => res.status(200).json(photos))
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
};

//-----------------------------------------------------------------------------------------

exports.getOnePhoto = (req, res) => {
  Photo.findOne( {
    where: { uuid: req.params.photoUuid },
    include: "owner",
    include:'comments',
    include:'likes'
    // include: [{ model: User, as:'owner'}]
  })
  .then( photo =>  {
    if(!photo) {
      return res.status(404).send( {message:`Photo ${req.params.photoUuid} does not exist` })
    }
    res.status(200).json(photo)})
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}

// -----------------------------------------------------------------------------------------

//exports.UpdateOne = (req, res ) => {} //  This design possibility is on standby

// -----------------------------------------------------------------------------------------

exports.deleteOnePhoto = (req, res) => {
  Photo.findOne( { where: { uuid: req.params.photoUuid } })
  .then( photo =>  {
    if(!photo) return res.status(404).send( {message:`Photo unknown` })
    if( photo.ownerId !== req.userId && !req.userRoles.includes("ROLE_ADMIN")) {
      return res.status(403).send( {message:`Access Denied` })
    }
    photoName = photo.imageUrl.split('/images/')[1];
    console.log(photoName);
    fs.unlink(`images/${photoName}`, () => {
      photo.destroy({})
      .then(() => res.status(200).json({ message: ` Photo successfully deleted !`}))
      .catch(err => res.status(403).json({ message: err.message }))
    })
  })
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}

// -----------------------------------------------------------------------------------------

exports.deleteAllPhoto = (req, res) => {

  Photo.findAll({ where: { ownerId: req.userId } })
  .then( photos => {
    if (photos.length === 0) {
      return res.status(401).send({message: " You have no photos"})
    }
    photos.forEach( photo => {
      let photoName = photo.imageUrl.split('/images/')[1];
      fs.unlink(`images/${photoName}`, () => {
          Photo.destroy({
            where: { ownerid: req.userId },
            truncate: false
          })
          .then(nums => res.send({message: `All your ${nums} photo(s) were successfully deleted`}))
      })
    })
  })
  .catch(err => res.status(500).send({ message: err.message || "Some error on deleting all your photos"}) )
};

// -----------------------------------------------------------------------------------------

exports.photoLike = (req, res) => {
   Photo.findOne({ where: { uuid: req.params.photoUuid} })
   .then( photo => {
      if(!photo) return res.status(404).send( {message:`Photo unknown` })
      Like.findOne( { 
        where: {
          [Op.and]: [ 
            {ownerId: req.userId},
            {photoId: photo.id}
          ]
        }
      })
      .then(like => {
        if(!like) {
          // creation du like
          Like.create({
            value: req.body.value,
            ownerId: req.userId,
            photoId: photo.id
          })
          .then( () => res.status(200).json({ message: ` Likes successfully sent on photo !`}))
          .catch( err => res.status(404).send({ message:err.message ||`Error when sending likes to Photo` }));
        }

        if(like) {
          // update du like
          like.update({value: req.body.value})
          .then( () => res.status(200).json({ message: ` Likes successfully updated on photo !`}))
          .catch( err => res.status(404).send({ message:err.message ||`Error when sending likes to Photo` }));
        }
      })
      .catch()


   })

   .catch()
 
      .catch(err => res.status(500).send({ message: err.message || "Server error on commenting photos."}) )
}


// exports.photoLike = (req, res) => {
//       Photo.findOne({ where: { uuid: req.params.photoUuid} })
//       .then( photo => {
//         if(!photo) return res.status(404).send( {message:`Photo unknown` })
//         Like.create({
//           value: req.body.value,
//           ownerId: req.userId,
//           photoId: photo.id
//         })
//         .then( () => res.status(200).json({ message: ` Photo successfully commented !`}))
//         .catch( err => res.status(404).send({ message:err.message ||`Error when sending likes to Photo` }));
//       })
//       .catch(err => res.status(500).send({ message: err.message || "Server error on commenting photos."}) )
// }


// ----------------------------------------------------------------------------------------

exports.createComment = (req, res) => {
  Photo.findOne({ where: { uuid: req.params.photoUuid } })
  .then( photo =>  {
    if(!photo) {
      return res.status(404).send( {message:`Photo ${req.params.photoUuid} not found` })
    }
    Comment.create({
      content: req.body.content, 
      ownerId: req.userId, 
      photoId: photo.id 
    })
    .then(() => res.status(200).json({ message: ` Comment successfully created !`}))
    .catch(err => res.status(403).json({ message: err.message }))
  })
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}

// ----------------------------------------------------------------------------------------

exports.getAllComment = (req, res) => {
  Photo.findOne({ where: { uuid: req.params.photoUuid } })
  .then( photo =>  {
    if(!photo) {
      return res.status(404).send( {message:`Photo ${req.params.photoUuid} not found` })
    }
    Comment.findAll({
      where: { photoId: photo.id },
      include: "owner" ,
      include: "photo" 
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
      .then( () => res.status(201).send({message: "User successfully updated ! "}))
      .catch( err => res.status(500).json( { message: err.message || "ERROR: Update Failed"} )) 
  })
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}
// ------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------
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

exports.deleteAllPhotoFromOneUser = (req, res) => {
  User.findOne( {where: { uuid: req.params.userUuid}})
  .then( user => { 
    if(!user) {
      return res.status(404).send( {message:`User not found` })
    }
     if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")) {
      return res.status(403).json( {error: "Access Denied ! " } )  
     } 
     Photo.destroy({
       where: { ownerId: user.id},
       truncate: false,      
      })
     .then( num => {
        if (num === 0) {
          return res.status(404).send({message:`No photo found for this user`})
        } 
        res.status(201).send({ message: `${num} photo(s) from user successfully deleted `})
      })
      .catch(() => res.send({ message:`Server Error ! Try again Soon 1`}))
  })
  .catch(() => res.status(500).json({ message:` Server Error ! Try again Soon 2 `})) 
}