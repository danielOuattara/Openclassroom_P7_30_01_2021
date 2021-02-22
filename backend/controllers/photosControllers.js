const db = require('./../models');
const Photo = db.tutorials;
const Op = db.Sequelize.Op;
const fs    = require('fs');

//-----------------------------------------------------------------------------------------------------------

exports.addPhoto = (req, res, next) => {

    if(!req.body.title) {
      return res.status(400).send({message: `Title can not be empty`});
    }

    // do not trust user input !
    const pattern =  /[\[\]<>=0]+/gi;

    if ( pattern.test(photoObject.title) ||  pattern.test(photoObject.url)  )
    {
      fs.unlink( `images/${req.file.filename}`, function (err) {
          if (err) throw err;
      })
      return res.status(401).json( {error: "Fill in text Invalid !"} );  //  Restriction from  using characters:  [ \ [ \ ] < > = 0 ]
    }

    // prepare a photo
    const photo = {
      title:    req.body.title,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      owner_id: req.body.userId
    };

    // save Tutorial in  the database
    Photo.create(photo)
    .then(  data => res.send(data))
    .catch( err => res.status(500).send({ message: err.message || ` Error occured while posting photo in DB`}))

}

//-----------------------------------------------------------------------------------------------------------

exports.userLikePhoto = (req, res, next) => {
    switch (req.body.like) {

        case 1:
            Photo.updateOne(
                {_id: req.params.id},
                {
                  $inc:  { likes: +1 },
                  $push: { usersLiked: req.body.userId},
                  _id: req.params.id
                }
            )
            .then( ()    => res.status(201).json( { message: 'Thanks for vote'}))
            .catch(error => res.status(400).json( {error } ))
            break;

        case -1:
            Photo.updateOne(
                {_id: req.params.id},
                {
                  $inc:  { dislikes: +1 },
                  $push: { usersDisliked: req.body.userId},
                  _id: req.params.id
                }
            )
            .then( ()    => res.status(201).json( { message: 'Thanks for vote'}))
            .catch(error => res.status(400).json( {error } ))
            break;


        case 0:
            Photo.findOne( { _id: req.params.id } )
            .then((photo) => {
                if (photo.usersLiked.find( userVote => userVote === req.body.userId)) {
                  Photo.updateOne(
                    { _id: req.params.id },
                    {
                      $inc: { likes: -1 },
                      $pull: { usersLiked: req.body.userId },
                      _id: req.params.id
                    }
                  )
                    .then(()       =>  res.status(201).json( { message: 'Your vote was reversed' } ) )
                    .catch((error) =>  res.status(400).json( { error} ));
                }

                if (photo.usersDisliked.find( userVote => userVote === req.body.userId)) {
                  Photo.updateOne(
                    { _id: req.params.id }, {
                      $inc: { dislikes: -1 },
                      $pull: { usersDisliked: req.body.userId },
                      _id: req.params.id
                    }
                  )
                    .then( ()       => { res.status(201).json({ message: 'Your vote was reversed' }) })
                    .catch( (error) =>  res.status(400).json({ error}));
                }
            })
            .catch(error => res.status(404).json({ error }));
            break;
    }
}


//-----------------------------------------------------------------------------------------------------------

// Retreive all Photo from the database (with conditions)

exports.getAllPhoto = (req, res, next) => {

  const title = req.query.title;    //  We use req.query.title to get query string from the Request and
                                    //  consider it as condition for findAll() method.
  let condition = title ? { title: { [Op.like]: `%${title}%`} } : null;

  Tutorial.findAll ( {where: condition} )
  .then( photos => res.status(200).json(photos))
  .catch( err => res.status(500).send( { message: err.message || `Error while retrieving photos`} ))
};


//-----------------------------------------------------------------------------------------------------------

// Find a single Tutorial with an id :

exports.getOnePhoto  = (req, res, next) => {

  const id = req.params.id;
  Photo.findByPk(id)
  .then( photo  => res.status(200).json(photo))
  .catch( err => res.status(500).send( { message: err.message || `Error while retrieving Tutorial id = ${id}`} ))
};



//-----------------------------------------------------------------------------------------------------------

  // Update a Tutorial by the id in the request

exports.updatePhoto = (req, res, next) => {

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




//-----------------------------------------------------------------------------------------------------------

// Delete a Photo with the specified Id in the request
exports.deleteOnePhoto = (req, res, next) => {

    const id = req.params.id;
    Photo.findByPk ( {where: {id}})

    .then( photo => {
      const filename = photo.imageUrl.split('/images/')[1];
        fs.unlink( `images/${filename}`, () => {

            Photo.destroy( { where: {id} } )
            .then( num => {
                if (num == 1) {
                    res.send( {message: `Photo id =${id} was deleted successfully !`})
                }
            })
            .catch( err => res.status(401).send( { message: err.message || `Error while deleting Tutorial id =  ${id} `} ))
            })
    })
    .catch( error => res.status(500).json({error}) )
};


// ---------------------------------------------------------------------------------------------------------

// Delete all tutorial from db

exports.deleteAllPhoto = (req, res, next) => {

    tutorial.destroy({
      where: { owner_id: req.body.userId}, truncate: false})
    .then( nums => res.send({message: ` All photo from ${req.body.userId} successfully deleted `}))
    .catch( err => res.status(500).send( { message: err.message || `Error while deleting  all Tutorials `} ))

};




//-----------------------------------------------------------------------------------------------------------

exports.addComment = (req, res, next) => {}

//-----------------------------------------------------------------------------------------------------------

exports.getAllComments = (req, res, next) => {}

//-----------------------------------------------------------------------------------------------------------

exports.getOneComment = (req, res, next) => {}

//-----------------------------------------------------------------------------------------------------------

exports.updateOneComment = (req, res, next) => {}

//-----------------------------------------------------------------------------------------------------------

exports.deleteOneComment = (req, res, next) => {}
