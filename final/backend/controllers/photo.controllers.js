
const db = require("./../models");
const { sequelize, User, Role, Photo } = require('./../models');
const Op = db.Sequelize.Op;



exports.AddPhoto = async (req, res, next)=> {

     const image= { 
         title: req.body.title, 
         imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
     };

    if(!title) {
      return res.status(400).send({message: `Title can not be empty`});
    }

    if(!imageUrl) {
      return res.status(400).send({message: `imageUrl can not be empty`});
    }
    
    try {
      await User.findOne({ where: {uuid: uuid}})
      await Photo.create(image)
      return res.status(201).json({message: 'Photo Successsfully Posted !'})

    } catch(err) {

      return res.status(500).json({ message: err.message || ` Error occured while posting photo in DB`})
    }
};

