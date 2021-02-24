const db = require("./../models");
const User = db.user;
const fs = require('fs')


exports.getOneUser = (req, res, next) => {
    const id = req.params.id;
    User.findByPk(id)
    .then( user  => res.status(200).json(user))
    .catch( err => res.status(500).send( { message: err.message || `Error while retrieving Tutorial id = ${id}`} ))
  };


// -----------------------------------------------------------------------------------------

exports.getAllUsers = (req, res, next) => {

  User.find()
  .then( users => res.status(200).json(users))
  .catch( error => res.status(400).json( {error} ));
  }

// -----------------------------------------------------------------------------------------

exports.updateUser = (req, res, next) => {

    const id = req.params.id;
    const photoObject = req.file ?
        {
          ...JSON.parse(req.body.photo),  //si update d'image
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        :
        {
          ...req.body // sinon
        }

    // do not trust user input, even on update !
    const regex =  /[\[\]<>=0]+/gi;

    if ( regex.test(photoObject.title) || regex.test(photoObject.imageUrl) ) {
      return res.status(401).json( { error: ' Fill in text Invalid !'  });
    }

    if (req.file) {

        Photo.findByPk(id)
        .then( photo => {
            const filename = photo.imageUrl.split('/images/')[1];

            fs.unlink( `images/${filename}`, () => {
                Photo.update(req.body, { where: {id}})
                .then( num => {
                  if (num == 1) {
                      res.send( {message: `Tutorial was updated succesfully !` })
                  } else {
                      res.send({ message: `Cannot update Tutorial with id=${id} : Tutorial not found OR Request body is empty!`})
                  }
              })
                .catch( error =>  res.status(400).json({error}))
            })
              })
        .catch( error => res.status(500).json({error}))

    } else {

        Photo.findByPk(id)
        .then(photo => {
          Photo.update(req.body, { where: {id}})
          .then( num => {
            if (num == 1) {
                res.send( {message: `Tutorial was updated succesfully !` })
            } else {
                res.send({ message: `Cannot update Tutorial with id=${id} : Tutorial not found OR Request body is empty!`})
            }
          })
          .catch( error =>  res.status(400).json({error}))
        })
    }
  }


// -----------------------------------------------------------------------------------------

exports.deleteUser = (req, res, next) => {

    User.findByPk(id)
    .then( user => {
        const filename = user.imageUrl.split('/images/')[1];

        // regaer
        fs.unlink( `images/${filename}`, () => {
            User.destroy(  {
              where: { _id: req.params.id } 
            })
            .then( ()     => res.status(200).json( { message: 'User deleted succesfully !'}) )
            .catch( error => {console.log(error); res.status(400).json({error}) })
            })
    })
    .catch( error => res.status(500).json({error}) )











}

// -----------------------------------------------------------------------------------------
