// check duplicate email

const db = require("../models");
const User = db.user;

module.exports = (req, res, next) => {   // check for duplicate user email or username
 
    User.findOne({  // Email
        where: {  email: req.body.email }
      })
    .then(user => {

        if (user) {
            return res.status(400).send({ message: " Email is already in use!" });
        } else {
          next();
        }
    })
    .catch( error =>  res.status(500).json( {error}))
  }


