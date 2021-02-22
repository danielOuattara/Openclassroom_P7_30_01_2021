

const db = require("./../models");
const User = db.user;

module.exports = (req, res, next) => {   // check for duplicate user email or username
 
    User.findOne({  // Username
      where: { username: req.body.username } 
      })
      .then(user => { 
          if (user) {
              return res.status(400).send({ message: "Failed! Username is already in use!" });
          }
          User.findOne({  // Email
            where: {  email: req.body.email }
          })
          .then(user => {
              if (user) {
                  return res.status(400).send({ message: "Failed! Email is already in use!" });
              }
            next();
          })
          // .catch();
      })
      .catch( error => res.status(500).json( {error} ))
  };
  