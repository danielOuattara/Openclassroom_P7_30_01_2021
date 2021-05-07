
const db = require("./../models");
const { sequelize, User, Role, Photo } = require('./../models');
const Op = db.Sequelize.Op;
const fs = require("fs");

//-----------------------------------------------------------------------------------------

exports.addPhoto = (req, res)=> {

    const image = { 
        title: req.body.title, 
        imageUrl:`${req.protocol}://${req.get('host')}/images/photos/${req.file.filename}` 
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
       res.status(201).json({message: 'Photo Successsfully Posted !'})})
     .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )

};

//-----------------------------------------------------------------------------------------

exports.getAllPhoto = (req, res) => {
  Photo.findAll({
    include:  'owner'   
  })
  .then( photos => res.status(200).json(photos))
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
};

//-----------------------------------------------------------------------------------------

exports.getOnePhoto = (req, res) => {
  Photo.findOne( {
    where: { uuid: req.params.photoUuid },
    include: "owner"
    // include: [{ model: User, as:'owner'}]
  })
  .then( photo =>  {
    if(!photo) {
      return res.status(400).send( {message:`Photo ${req.params.photoUuid} does not exist` })
    }
    res.status(200).json(photo)})
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}

// -----------------------------------------------------------------------------------------

//exports.UpdateOne = (req, res ) => {} //  This design possibility is on standby

// -----------------------------------------------------------------------------------------

exports.deleteOne = (req, res) => {
  Photo.findOne( {
    where: { 
      [Op.or]: [
        {uuid: req.params.photoUuid },
        { ownerId: req.userId}
      ]
    }
  })
  .then( photo =>  {
    if( photo.ownerId !== req.userId) {
      return res.status(403).send( {message:`Access Denied` })
    }
    if(photo.uuid !== req.params.photoUuid) {
      return res.status(404).send( {message:`Photo unknown` })
    }
    photoName = photo.imageUrl.split('/images/')[1];
    fs.unlink(`images/${photoName}`, () => {
      photo.destroy({})
      .then(() => res.status(200).json({ message: ` Photo successfully deleted !`}))
      .catch(err => res.status(403).json({ message: err.message }))
    })

  })
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}

// -----------------------------------------------------------------------------------------

exports.deleteAll = (req, res) => {

  Photo.findAll({
    where: { ownerId: req.userId },
  })
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
  
}