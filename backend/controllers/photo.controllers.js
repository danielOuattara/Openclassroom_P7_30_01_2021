
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
        include: [{model: User, as: 'owner'}]
      }, 
      {
        model: Like,
        as: 'likes',
        include: [{model: User, as: 'owner'}]
      },
    ],

    order: [
      ['createdAt', 'DESC']
    ],
  })
  .then( photos => res.status(200).json(photos))
  .catch( err => res.status(500).json(err.message));
};

//-----------------------------------------------------------------------------------------

exports.getOnePhoto = (req, res) => {
  Photo.findOne({
    where: { uuid: req.params.photoUuid },
    include: [
      {
        model: Comment,
        as: 'comments',
        include: [{model: User, as: 'owner'}],
        order: [
            ['createdAt', 'DESC']
        ],
      }, 
      {
        model: Like,
        as: 'likes',
        include: [{model: User, as: 'owner'}],
        order: [
            ['createdAt', 'DESC']
        ],
      },
    ],
  })
  .then( photo =>  {
      if (!photo) {
          return res.status(404).json("Photo unknown !");
      }
      res.status(200).json(photo)})
  .catch( err => res.status(500).json({ message: err.message || ` Server Error ! Try again Soon `}) )
}

// -----------------------------------------------------------------------------------------

exports.deleteOnePhoto = async (req, res) => {
    try {
        const photo = await Photo.findOne( { where: { uuid: req.params.photoUuid } });
        if (!photo) {
          return res.status(404).json(" Photo unknown !");
        }
        if(photo.ownerId !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
            return res.status(403).json({ Error : "Non Authorized !" })  
        }
        const photoName = photo.imageUrl.split('/photos/')[1];
        fs.unlink(`images/photos/${photoName}`, (err) => {
          if(err) throw err;
        })
        await photo.destroy();
        res.status(200).json({ message: ` Photo successfully deleted !`})
        console.log("hello");
    } catch(err) {
      return res.status(403).json(err.message )
    }
}

// -----------------------------------------------------------------------------------------

exports.userDeleteAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.findAll({ where: { ownerId: req.userId } });
        if (photos.length === 0) {
            return res.status(404).send("You have no photos");
        }
        photos.forEach( async photo => {
            let photoName = photo.imageUrl.split('/photos/')[1];
            fs.unlink(`images/photos/${photoName}`, (err) => {
              if(err) throw err;
            })
            await photo.destroy()
            res.json(`All your ${photos.length} photo(s) were successfully deleted`)
          })
    } catch(err) {
        res.status(500).send(err.message) 
    }
}

// ----------------------------------------------------------------------------------------------

exports.deleteAllPhotoFromOneUser = async (req, res) => {
    try {
      const user = await User.findOne( {where: { uuid: req.params.userUuid}})
      if(!user) {
          return res.status(404).send(`User not found`);
      }
      if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")) {
          return res.status(403).json( {error: "Access Denied ! " });
      } 
      const num = await Photo.destroy({
          where: { ownerId: user.id},
          truncate: false,      
          })
      if (num === 0) {
          return res.status(404).send(`No photo found for this user`);
      } 
      res.status(201).send(`${num} photo(s) successfully deleted `);
    
    } catch(err) {
        res.status(500).json(err.message) 
    }
}

