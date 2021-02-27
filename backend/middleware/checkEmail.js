
// check duplicate email


const validator = require('email-validator')
const db = require("./../models");
const { User } = require('./../models');



module.exports = (req, res, next) => {   // check for duplicate user email or username

    if (!validator.validate(req.body.email)) {
      return res.status(401).json({error:" Email invalid !" } )
    }

    User.findOne({ 
        where: {  email: req.body.email }
      })
    .then(user => {
        if (user) {
            return res.status(400).send({ message: " Email is already in use!" });
        } 
        next();
    })
    .catch( error =>  res.status(500).json( {error}))
  }


