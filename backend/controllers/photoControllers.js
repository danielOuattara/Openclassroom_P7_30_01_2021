const db = require('../models');
const  { Photo, Op } = require('./../models')
// const Op = db.Sequelize.Op;
const fs    = require('fs');

//-----------------------------------------------------------------------------------------------------------

exports.addPhoto = (req, res, next) => {

    // const photoObject = JSON.parse(req.body.photo);

    if(req.body.title = "") {
      return res.status(400).send({message: `Title can not be empty`});
    }

    // do not trust user input !
    const pattern =  /[\[\]<>=0]+/gi;

    if ( pattern.test(req.body.title) ||  pattern.test(req.body.imageUrl)  )
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
    };

    // save Tutorial in  the database
    Photo.create(photo)
    .then( ()  => res.status(201).json({message: 'Photo Successsfully Posted !'}))
    .catch( err => res.status(500).json({ message: err.message || ` Error occured while posting photo in DB`}))

}

//-----------------------------------------------------------------------------------------------------------

exports.userLikePhoto = (req, res, next) => {
    // switch (req.body.like) {

        // case 1:
        //     Photo.updateOne(
        //         {_id: req.params.id},
        //         {
        //           $inc:  { likes: +1 },
        //           $push: { usersLiked: req.body.userId},
        //           _id: req.params.id
        //         }
        //     )
        //     .then( ()    => res.status(201).json( { message: 'Thanks for vote'}))
        //     .catch(error => res.status(400).json( {error } ))
        //     break;

        // case -1:
        //     Photo.updateOne(
        //         {_id: req.params.id},
        //         {
        //           $inc:  { dislikes: +1 },
        //           $push: { usersDisliked: req.body.userId},
        //           _id: req.params.id
        //         }
        //     )
        //     .then( ()    => res.status(201).json( { message: 'Thanks for vote'}))
        //     .catch(error => res.status(400).json( {error } ))
        //     break;


        // case 0:
        //     Photo.findOne( { _id: req.params.id } )
        //     .then((photo) => {
        //         if (photo.usersLiked.find( userVote => userVote === req.body.userId)) {
        //           Photo.updateOne(
        //             { _id: req.params.id },
        //             {
        //               $inc: { likes: -1 },
        //               $pull: { usersLiked: req.body.userId },
        //               _id: req.params.id
        //             }
        //           )
        //             .then(()       =>  res.status(201).json( { message: 'Your vote was reversed' } ) )
        //             .catch((error) =>  res.status(400).json( { error} ));
        //         }

        //         if (photo.usersDisliked.find( userVote => userVote === req.body.userId)) {
        //           Photo.updateOne(
        //             { _id: req.params.id }, {
        //               $inc: { dislikes: -1 },
        //               $pull: { usersDisliked: req.body.userId },
        //               _id: req.params.id
        //             }
        //           )
        //             .then( ()       => { res.status(201).json({ message: 'Your vote was reversed' }) })
        //             .catch( (error) =>  res.status(400).json({ error}));
        //         }
        //     })
        //     .catch(error => res.status(404).json({ error }));
        //     break;
    // }
}


//-----------------------------------------------------------------------------------------------------------

// Retreive all Photo from the database (with conditions)

exports.getAllPhoto = (req, res, next) => {

  const title = req.query.title;    //  We use req.query.title to get query string from the Request and
                                    //  consider it as condition for findAll() method.
  let condition = title ? { title: { [Op.like]: `%${title}%`} } : null;

  Photo.findAll ( {where: condition} )
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

  // exports.updateOnePhoto = ( req, res, next) = {}  // NON ACCEPTEE

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
