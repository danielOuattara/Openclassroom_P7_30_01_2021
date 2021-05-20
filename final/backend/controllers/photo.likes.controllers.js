
const db = require("./../models");
const { sequelize, User, Role, Photo, Comment, Like } = require('./../models');
const Op = db.Sequelize.Op;
const fs = require("fs");

//-----------------------------------------------------------------------------------------

exports.photoLikes =  async (req, res) => {
  try  {
    const photo = await Photo.findOne({ where: { uuid: req.params.photoUuid} })
    if(!photo)  {
      return res.status(404).send( {message:`Photo unknown` })
    }
    switch (req.body.value) {
        case 1:
        case -1:
            await Like.create({
              value: req.body.value,
              ownerId: req.userId,
              photoId: photo.id
            })
            res.status(201).json({message: "Voted successfully"})
            break;
        case 0:
            await Like.destroy({ 
                where: { [Op.and]: [ {ownerId: req.userId}, {photoId: photo.id} ] }
            })
            res.status(201).json({message: "Voted successfully"})
            break;
        
        default:
          res.status(400).json({message: "Bad Request !"})

    }
   } catch(err){
      return res.status(500).json( {message:"Server Error"})
  }
}
// exports.photoLikes =  async (req, res) => {  // @@@ -->>> WORKING !!!
//   try  {
//     const photo = await Photo.findOne({ where: { uuid: req.params.photoUuid} })
//     if(!photo)  {
//       return res.status(404).send( {message:`Photo unknown` })
//     }
//     const like = await Like.findOne({ 
//       where: {
//         [Op.and]: [ 
//           {ownerId: req.userId},
//           {photoId: photo.id}
//         ]
//       }
//     })

//     if(!like) {   // like creation
//         await Like.create({
//           value: req.body.value,
//           ownerId: req.userId,
//           photoId: photo.id
//         })
//         return res.status(200).json({ message: ` Likes successfully sent on photo !`})

//     } else { // like update
//         await like.update({value: req.body.value})
//         return res.status(200).json({ message: ` Likes successfully updated on photo !`})
//     }
//   } catch(err) {
//       return res.status(500).json({Error: err.message})
//   }
// }



// exports.photoLikes = (req, res) => {   // @@@ -->>> WORKING !!!
//    Photo.findOne({ where: { uuid: req.params.photoUuid} })
//    .then( photo => {
//       if(!photo)  {
//         return res.status(404).send( {message:`Photo unknown` })
//       }
//       Like.findOne({ 
//         where: {
//           [Op.and]: [ 
//             {ownerId: req.userId},
//             {photoId: photo.id}
//           ]
//         }
//       })
//       .then(like => {

//         if(!like) {   // like creation
//           Like.create({
//             value: req.body.value,
//             ownerId: req.userId,
//             photoId: photo.id
//           })
//           .then( () => res.status(200).json({ message: ` Likes successfully sent on photo !`}))
//           .catch( err => res.status(404).send({ message:err.message ||`Error when sending likes to Photo` }));
//         }

//         if(like) { // like update
//           like.update({value: req.body.value})
//           .then( () => res.status(200).json({ message: ` Likes successfully updated on photo !`}))
//           .catch( err => res.status(404).send({ message:err.message ||`Error when sending likes to Photo` }));
//         }
//       })
//       .catch()
//    })
//    .catch(err => res.status(500).send({ message: err.message || "Server error on commenting photos."}) )
// }



exports.photoLikesCounting = (req, res) => { }

//    Photo.findOne({ where: { uuid: req.params.photoUuid} })
//    .then( photo => {
//       if(!photo)  {
//         return res.status(404).send( {message:`Photo unknown` })
//       }
//       Like.findOne({ 
//         where: {
//           [Op.and]: [ 
//             {ownerId: req.userId},
//             {photoId: photo.id}
//           ]
//         }
//       })
//       .then(like => {

//         if(!like) {   // like creation
//           Like.create({
//             value: req.body.value,
//             ownerId: req.userId,
//             photoId: photo.id
//           })
//           .then( () => res.status(200).json({ message: ` Likes successfully sent on photo !`}))
//           .catch( err => res.status(404).send({ message:err.message ||`Error when sending likes to Photo` }));
//         }

//         if(like) { // like update
//           console.log("like = ", like)
//           like.update({value: req.body.value})
//           .then( () => res.status(200).json({ message: ` Likes successfully updated on photo !`}))
//           .catch( err => res.status(404).send({ message:err.message ||`Error when sending likes to Photo` }));
//         }
//       })
//       .catch()
//    })
//    .catch(err => res.status(500).send({ message: err.message || "Server error on commenting photos."}) )
// }
