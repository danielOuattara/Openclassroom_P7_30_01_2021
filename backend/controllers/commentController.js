
const db = require('./../models');
const Comment = db.comments;
const Op = db.Sequelize.Op;



//------------------------------------------------------------------------------------
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

 //---------------------------------------------------------------------------------------------

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


// Delete all tutorial from db
exports.deleteAll = (req, res, next) => { 

    Tutorial.destroy({ where: {}, truncate: false})
    .then( nums => res.send({message: ` All Tutorials successfully deleted `}))
    .catch( err => res.status(500).send( { message: err.message || `Error while deleting  all Tutorials `} ))
};


// Find all published Tutorials
exports.findAllPublished = (req, res, next) => {
    Tutorial.findAll( {where: { published: true} })
    .then( data => res.send(data))
    .catch( err => res.status(500).send( { message: err.message || `Error while retrieving all Tutorials `} ))
};






/*

// create & save a new Tutorial (add & save)
exports.create = (req, res, next) => { 
    // validate request
    if(!req.body.title) {
        res.status(400).send({message: `Title can not be empty`});
        return
    }

    // create a tutorial
    const tutorial = {
        title:       req.body.title,
        description: req.body.description,
        published:   req.body.published ? req.body.published : false
    };

    // save Tutorial in  the database
    Tutorial.create(tutorial)
    .then(  data => res.send(data))
    .catch( err => res.status(500).send({ message: err.message || ` Some error occured while creating the Tutorial in DB`}))
 };


// Retreive all Tutorials from the database (with conditions)
exports.findAll = (req, res, next) => {   

    const title = req.query.title;    //  We use req.query.title to get query string from the Request and consider it as condition for findAll() method.
    let condition = title ? { title: { [Op.like]: `%${title}%`} } : null;

    Tutorial.findAll ( {where: condition} )
    .then( data => res.send(data))
    .catch( err => res.status(500).send( { message: err.message || `Error while retrieving tutorials`} ))
};


// Find a single Tutorial with an id :
exports.findOne  = (req, res, next) => {  
    const id = req.params.id;
    Tutorial.findByPk(id)
    .then(data => res.send(data))
    .catch( err => res.status(500).send( { message: err.message || `Error while retrieving Tutorial id = ${id}`} ))
 };


// Update a Tutorial by the id in the request
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


// Delete all tutorial from db
exports.deleteAll = (req, res, next) => { 

    tutorial.destroy({ where: {}, truncate: false})
    .then( nums => res.send({message: ` All Tutorials successfully deleted `}))
    .catch( err => res.status(500).send( { message: err.message || `Error while deleting  all Tutorials `} ))
};


// Find all published Tutorials
exports.findAllPublished = (req, res, next) => {
    Tutorial.findAll( {where: { published: true} })
    .then( data => res.send(data))
    .catch( err => res.status(500).send( { message: err.message || `Error while retrieving all Tutorials `} ))
};

*/

