
const db = require("./../models");
const { sequelize, User, Role, Photo, Comment, Like } = require('./../models');
const Op = db.Sequelize.Op;
const fs = require("fs");

//-----------------------------------------------------------------------------------------
// exports.addPhoto = async (req, res)=> {
//     try {
//       const image = { 
//         photos: req.body.event,
//         title: req.body.title, 
//         imageUrl:`${req.protocol}://${req.get('host')}/images/photos/${req.file.filename}` 
//       };
      
//       if (!image.title) {
//         throw Error("Photo title is required");
//       }
//       // if (!image.imageUrl) {
//       //   return res.status(400).send({ error: "Please, select a photo to post"})
//       //   // throw Error("Please, select a photo to post")
//       // }
//       await Photo.create({...image, ownerId: req.userId })
//       return res.status(200).json({message: 'Photo Successsfully Posted !'} )
//     } 
//     catch(err) {
//       return res.status(400).json({ Error : err.message }) 
//     }
// };

exports.addPhoto = (req, res)=> {
    console.log(" req = ", req.file)
    const image = { 
      photos: req.body.event,
      title: req.body.title, 
      imageUrl:`${req.protocol}://${req.get('host')}/images/photos/${req.file.filename}` 
    };
    // if(!image.title) {
    //   return res.status(400).send({message: `Title can not be empty`});
    // }
    // if(!image.imageUrl) {
    //   return res.status(400).send({message: `imageUrl can not be empty`});
    // }
    Photo.create( {...image, ownerId: req.userId } )
    .then( () =>  {
       res.status(200).json({message: 'Photo Successsfully Posted !'})})
    .catch( err => res.status(400).json({ message: err.message}) )
};

//-----------------------------------------------------------------------------------------
exports.getAllPhoto = (req, res) => {
  Photo.findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    include:  ['owner','comments'],
  })
  .then( photos => res.status(200).json(photos))
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
};

//-----------------------------------------------------------------------------------------
exports.getOnePhoto = (req, res) => {
  Photo.findOne( {
    where: { uuid: req.params.photoUuid },
    include: ["owner","comments", "likes"]
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

exports.deleteOnePhoto =  async (req, res) => {
  try{
    const photo = await Photo.findOne( { where: { uuid: req.params.photoUuid } });
    console.log(photo);
    if(!photo)  {
       throw(`Photo unknown`)
    }

    if( photo.ownerId !== req.userId && !req.userRoles.includes("ROLE_ADMIN")) {
      throw (`Access Denied` )
    }
    // if(!photo)  {
    //   return res.status(404).send( {message:`Photo unknown` })
    // }

    // if( photo.ownerId !== req.userId && !req.userRoles.includes("ROLE_ADMIN")) {
    //   return res.status(403).send( {message:`Access Denied` })
    // }
    const photoName = photo.imageUrl.split('/photos/')[1];
    fs.unlink(`images/photos/${photoName}`, () => {
    //    await Photo.destroy({ where: { uuid: req.params.photoUuid } })
    //    res.status(200).json({ message: ` Photo successfully deleted !`})
    // })
       photo.destroy({})
       res.status(200).json({ message: ` Photo successfully deleted !`})
    })
  } 
  catch(err) { 
      return res.status(404).json({ message: err.message })
   }
};

// exports.deleteOnePhoto =  async (req, res) => {
//   Photo.findOne( { where: { uuid: req.params.photoUuid } })
//   .then( photo =>  {
    
//     if(!photo) return res.status(404).send( {message:`Photo unknown` })
    
//     if( photo.ownerId !== req.userId && !req.userRoles.includes("ROLE_ADMIN")) {
//       return res.status(403).send( {message:`Access Denied` })
//     }
//     const photoName = photo.imageUrl.split('/photos/')[1];
//     console.log(photoName);
//     fs.unlink(`images/photos/${photoName}`, () => {
//       photo.destroy({})
//       .then(() => res.status(200).json({ message: ` Photo successfully deleted !`}))
//       .catch(err => res.status(403).json({ message: err.message }))
//     })
//   })
//   .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
// }

// exports.deleteOnePhoto = (req, res) => {
//   Photo.findOne( { where: { uuid: req.params.photoUuid } })
//   .then( photo =>  {
//     if(!photo) return res.status(404).send( {message:`Photo unknown` })
//     if( photo.ownerId !== req.userId && !req.userRoles.includes("ROLE_ADMIN")) {
//       return res.status(403).send( {message:`Access Denied` })
//     }
//     const photoName = photo.imageUrl.split('/photos/')[1];
//     console.log(photoName);
//     fs.unlink(`images/photos/${photoName}`, () => {
//       photo.destroy({})
//       .then(() => res.status(200).json({ message: ` Photo successfully deleted !`}))
//       .catch(err => res.status(403).json({ message: err.message }))
//     })
//   })
//   .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
// }

// -----------------------------------------------------------------------------------------
exports.deleteAllPhoto = (req, res) => {
  Photo.findAll({ where: { ownerId: req.userId } })
  .then( photos => {
    if (photos.length === 0) {
      return res.status(401).send({message: " You have no photos"})
    }
    photos.forEach( photo => {
      let photoName = photo.imageUrl.split('/photos/')[1];
      fs.unlink(`images/photos/${photoName}`, () => {
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

// ----------------------------------------------------------------------------------------------
