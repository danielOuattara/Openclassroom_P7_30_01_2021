
/* 
Create Controllers
Controller for Authentication

There are 2 main functions for Authentication:
- signup: > create new User in database (role is user if not specifying role)

- signin: >  find username of the request in database, if it exists
          >  compare password with password in database using bcrypt, if it is correct
          >  generate a token using jsonwebtoken
          >  return user information & access Token

controllers/auth.controller.js */

const db = require("../models");
const config = require("../config/authConfig.js");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// --------------------------------------------------------------------------------------

exports.signin = (req, res) => {


  //   // 'Password not strong ?'
  //   if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?&#@$%µ€_])[a-zA-Z0-9!?&#@$%µ€_]{7,}/.test(req.body.password)) {
  //     return res.status(401).json({ error: `Password not Strong! :  7 characters at least 1 Uppercase,
  //                                           1 Lowercase, 1 Digit, 1 symbol between: ! ? & # @ $ % µ € _ `});
  // }


  // Save User to Database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)  // change her hashSync() to hash()  <------
  })
  .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: { [Op.or]: req.body.roles }
          }
        })
        .then(roles => {
            user.setRoles(roles)
            .then(() => { res.send({ message: "User was registered successfully!" }) });
        })
        .catch( error =>  res.status(400).json( {error}) );

      } else {
        // user role = 1
        user.setRoles([1])
        .then(() => { res.send({ message: "User was registered successfully!" }) })
        .catch( error =>  res.status(400).json( {error}) )
      }
  })
  .catch(err => { res.status(500).send({ message: err.message }) });
};

// ----------------------------------------------------------------------------------------


exports.login = (req, res) => {


  
  User.findOne({
    where: { email: req.body.email }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(  // change her compareSync() to compare()  <------
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    const authorities = [];
    user.getRoles()
    .then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
  })
  .catch(err => { res.status(500).send({ message: err.message }) });
};
