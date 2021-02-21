
/* 
Create Middleware function
---------------------------
To verify a Signup action, we need 2 functions:
– check if username or email is duplicate or not
– check if roles in the request is existed or not

middleware/verifySignUp.js */


const db = require("./../models");
const ROLES = db.ROLES;
const User = db.user;


// ------------------------------------------------------------------------------------------

checkDuplicateUser = (req, res, next) => {   // check for duplicate user email or username
 
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
        .catch();
  })
  .catch();
};

// --------------------------------------------------------------------------------------------------

checkRoles = (req, res, next) => {

  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({  message: "Failed! Role does not exist = " + req.body.roles[i] });
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUser,
  checkRolesExisted,
};

module.exports = verifySignUp;
