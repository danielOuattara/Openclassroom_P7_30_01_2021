
const Photo = require('../dataStructure/PhotoModel.js');
const fs    = require('fs');

//-----------------------------------------------------------------------------------------------------------

exports.addPhoto = (req, res, next) => { 

    const photoObject = JSON.parse(req.body.photo); 
    
    // do not trust user input !
    const pattern     =  /[\[\]<>=0]+/gi;

    if ( pattern.test(photoObject.name)         ||
         pattern.test(photoObject.manufacturer) || 
         pattern.test(photoObject.description)  || 
         pattern.test(photoObject.mainPepper ) ) 
    {
      fs.unlink( `images/${req.file.filename}`, function (err) {
          if (err) throw err;
      })
      return res.status(401).json( {error: "Fill in text Invalid !"} );  // ` Restriction from  using those characters:  ^ < > ' " = 1 0 ` 
    } 

    // check for duplicate entry in database !
    Photo.findOne(   
         {$and: [ 
                  { name:         photoObject.name},
                  { manufacturer: photoObject.manufacturer },
                  { mainPepper:   photoObject.mainPepper },
                  { heat:         photoObject.heat }
                ]
        }
    )
    .then( duplicate => {
        if(duplicate) {
            fs.unlink( `images/${req.file.filename}`, function (err) {
              if (err) throw err;
            })
            return res.status(401).json( {error: "Duplicate Photo Found !"});  // Duplicate found in database
        }
        
        const photo = new Photo(
              {
                ...photoObject,
                imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
              }
            );
        photo.save()
        .then( ()     => res.status(201).json({message: 'Item Registered !'}))
        .catch( error => res.status(400).json( {error} ));
    })
    .catch( error =>  res.status(500).json( {error}))
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

exports.deleteOnePhoto = (req, res, next) => { 
    Photo.findOne({ _id: req.params.id })
    .then( photo => {
        const filename = photo.imageUrl.split('/images/')[1];
        fs.unlink( `images/${filename}`, () => {
            Photo.deleteOne( { _id: req.params.id } )
            .then( ()     => res.status(200).json( { message: 'Item deleted succesfully !'}) )
            .catch( error => {console.log(error); res.status(400).json({error}) })
            })
    })
    .catch( error => res.status(500).json({error}) )
}

//-----------------------------------------------------------------------------------------------------------

exports.updatePhoto =  (req, res, next) => {  

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
    if ( regex.test(photoObject.name)  ||
         regex.test(photoObject.manufacturer) || 
         regex.test(photoObject.description) || 
         regex.test(photoObject.mainPepper ) 
       ) {
      return res.status(401).json( { error: ' Fill in text Invalid !' });
    } 

    if (req.file) {
        Photo.findOne({ _id: req.params.id })
        .then( photo => {
            const filename = photo.imageUrl.split('/images/')[1];
            fs.unlink( `images/${filename}`, () => {

              Photo.updateOne( 
                { _id: req.params.id }, 
                { ...photoObject, _id:req.params.id } )
              .then( ()     => res.status(200).json({ message: 'Update successfully for item : ' + req.params.id}))
              .catch( error =>  res.status(400).json({error}))
                })
              })
        .catch( error => res.status(500).json({error}))

    } else {

    Photo.updateOne( { _id: req.params.id }, { ...photoObject, _id:req.params.id } )
    .then( ()     => res.status(200).json({ message: 'Update successfully for item : ' + req.params.id}))
    .catch( error =>  res.status(400).json({error}))

    }

  }

//-----------------------------------------------------------------------------------------------------------

exports.getOnePhoto = (req, res, next) => {  // renvoie la photo spécifique avec son ID au client;   
    Photo.findOne( { _id: req.params.id } )
    .then( photo  => res.status(200).json(photo))
    .catch( error => res.status(404).json( {error} ))
}

//-----------------------------------------------------------------------------------------------------------

exports.getAllPhoto = (req, res, next) => {   // renvoie tableau de toutes les photos de la BD à l'utilisateur
Photo.find()
.then( photos => res.status(200).json(photos))
.catch( error => res.status(400).json( {error} ));
}

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
