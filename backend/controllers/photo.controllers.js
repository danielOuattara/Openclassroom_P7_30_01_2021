
// const db = require("./../models");
const { User, Photo, Comment, Like } = require('./../models');
// const Op = db.Sequelize.Op;
const fs = require("fs");

//-----------------------------------------------------------------------------------------

exports.addPhoto = async (req, res)=> {
    try {
        const image = { 
          title: req.body.title, 
          imageUrl:`${req.protocol}://${req.get('host')}/images/photos/${req.file.filename}` 
        };

        if(!req.body.title) {
            const photoName = image.imageUrl.split('/photos/')[1];
            fs.unlink(`images/photos/${photoName}`, (err) => {
                if(err) throw err;
            })
            throw Error("Title is required !");
        }

        await Photo.create( {...image, ownerId: req.userId } )
        return res.status(200).json({message: 'Photo Successsfully Posted !'})

    } catch(err) {
      res.status(400).json(err.message)
    }  
};

//-----------------------------------------------------------------------------------------

exports.getAllPhoto = (req, res) => {
  Photo.findAll({
    where: {}, 
    include: [
      {
        model: Comment,
        as: 'comments',
        include: [{model: User, as: 'owners'}]
      }, 
      {
        model: Like,
        as: 'likes',
        include: [{model: User, as: 'owners'}]
      },
    ],

    order: [
      ['createdAt', 'DESC']
    ],
    include:  ['owner','comments','likes'],
  })
  .then( photos => res.status(200).json(photos))
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
};



/* -------------------------------------- 

Article.findAll({
        where: condition, 
        include: [{
            model: Commentaire,
            as: 'commentaires',
            include: [{model: Users, as: 'author'}]
        }],



-----------------------------------------*/


// exports.getAllPhoto = (req, res) => {
//   Photo.findAll({
//     order: [
//       ['createdAt', 'DESC']
//     ],
//     include:  ['owner','comments','likes'],
//   })
//   .then( photos => res.status(200).json(photos))
//   .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
// };

//-----------------------------------------------------------------------------------------

exports.getOnePhoto = (req, res) => {
  Photo.findOne({
    where: { uuid: req.params.photoUuid },
    include: ["owner","comments", "likes"]
    // include: [{ model: User, as:'owner'}]
  })
  .then( photo =>  {
    if (!photo) {
        return res.status(404).json({ Error: " Photo unknown !"});
    }
    res.status(200).json(photo)})
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}

// -----------------------------------------------------------------------------------------

exports.deleteOnePhoto = (req, res) => {
  Photo.findOne( { where: { uuid: req.params.photoUuid } })
  .then( photo =>  {
    if (!photo) {
        return res.status(404).json(" Photo unknown !");
    }
    // const photoName = photo.imageUrl.split('/photos/')[1];
    // fs.unlink(`images/photos/${photoName}`, (err) => {
    //   if(err) throw err;
    // })
    Photo.destroy({ where: { uuid: req.params.photoUuid } })
    .then(() => res.status(200).json({ message: ` Photo successfully deleted !`}))
    .catch(err => res.status(403).json({ message: err.message }))
  })
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}

// -----------------------------------------------------------------------------------------

exports.deleteUserAllPhoto = (req, res) => {
  console.log("Hello");
  Photo.findAll({ where: { ownerId: req.userId } })
  .then( photos => {
    if (photos.length === 0) {
      return res.status(401).send({message: " You have no photos"})
    }
    photos.forEach( photo => {
      let photoName = photo.imageUrl.split('/photos/')[1];
      fs.unlink(`images/photos/${photoName}`, (err) => {
        if(err) throw err;
    })
      Photo.destroy({
        where: { ownerid: req.userId },
        truncate: false
      })
      then(nums => res.send({message: `All your ${nums} photo(s) were successfully deleted`}))
      })
  })
  .catch(err => res.status(500).send({ message: err.message || "Some error on deleting all your photos"}) )
};

// ----------------------------------------------------------------------------------------------

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