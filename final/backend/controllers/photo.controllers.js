
const db = require("./../models");
const { sequelize, User, Role, Photo } = require('./../models');
const Op = db.Sequelize.Op;

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
    
     Photo.create( {
          ...image,
          ownerUuid: req.userUuid
     })
     .then( photo =>  {
       console.log(photo.toJSON())
       res.status(201).json({message: 'Photo Successsfully Posted !'})})
     .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )

};

//-----------------------------------------------------------------------------------------

exports.getAllPhoto = (req, res) => {
  Photo.findAll({
    // include:  'owner'   
  })
  .then( photos => res.status(200).json(photos))
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
};

//-----------------------------------------------------------------------------------------

exports.getOnePhoto = (req, res) => {
  Photo.findOne( {
    where: { uuid: req.params.photoUuid },
    // include: "owner"
    // include: [{ model: User, as:'owner'}]
  })
  .then( photo =>  {
    if(!photo) {
      return res.satus(400).send( {message: message.err || `Photo ${req.params.photoUuid} does not exist` })
    }
    res.status(200).json(photo)})
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}