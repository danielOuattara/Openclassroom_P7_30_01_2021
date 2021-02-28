
const db = require('./../models');
const Comment = db.comments;
const Op = db.Sequelize.Op;


//---------------------------------------------------------------------------------------------------------------

// create & save a new Tutorial (add & save)
exports.create = (req, res, next) => { 

    if(!req.body.content) {
        return res.status(400).send({message: `Content can not be empty`});
    }

    const comment = { content: req.body.content };

    Comment.create(comment)
    .then( () => res.status(201).json({message: 'Comment added !'}))
    .catch( err => res.status(500).send({ message: err.message || ` Some error happened when creating your comment`}))
 };

 //-------------------------------------------------------------------------------------------------------------

exports.update = (req, res, next) => {
    const id = req.params.id;
    Tutorial.update(req.body, { where: {id}})  // ???
    .then( num => {
        if (num == 1) {
            res.send( {message: `Tutorial was updated succesfully !` })
        } else {
            res.send({ message: `Cannot update Tutorial with id=${id} : Tutorial not found OR Request body is empty!`})
        }
    })
    .catch( err => res.status(500).send( { message: err.message || `Error while updating Tutorial id = ${id}`} ))
 };

 // -------------------------------------------------------------------------------------------------------------

// Delete a Tutorial with the specified Id in the request
exports.delete = (req, res, next) => { 
    const id= req.params.id;
    Tutorial.destroy ( { where: {id} })
    .then( num=> {
        if (num ==1) {
            res.send( {message: `Tutorial id =${id} was deleted successfully !`})
        }
    })
    .catch( err => res.status(500).send( { message: err.message || `Error while deleting Tutorial id =  ${id} `} ))
};

 // -------------------------------------------------------------------------------------------------------------


// Delete all tutorial from db
exports.deleteAll = (req, res, next) => { 

    Tutorial.destroy({ where: {}, truncate: false})
    .then( nums => res.send({message: ` All Tutorials successfully deleted `}))
    .catch( err => res.status(500).send( { message: err.message || `Error while deleting  all Tutorials `} ))
};

 // -------------------------------------------------------------------------------------------------------------


// Find all published Tutorials
exports.findAllPublished = (req, res, next) => {
    Tutorial.findAll( {where: { published: true} })
    .then( data => res.send(data))
    .catch( err => res.status(500).send( { message: err.message || `Error while retrieving all Tutorials `} ))
};

 // -------------------------------------------------------------------------------------------------------------

