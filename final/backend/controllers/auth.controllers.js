
const bcrypt = require("bcryptjs");
const config = require("./../config/auth.config.js");
const db = require("./../models");
const { sequelize, User, Role } = require('./../models');
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

//--------------------------------------------------------------------------

exports.signin = (req ,res) =>{

    User.create({  // Save new User to Database
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then( user => { 
        if(req.body.roles) {
            Role.findAll({ 
                where : {
                    name: {[Op.or]: req.body.roles }
                }
            })
            .then( roles => {
                user.setRoles(roles)
                .then( () =>  res.send({ message: "User was registered Successfully !"}))
                .catch( err =>  {
                console.log(err);
                res.status(400).send({ message: "error2"})});
            })
            .catch( err =>  {
                console.log(err);
                res.status(400).send({ message: "error3"})});

        } else { // user role = 1
            user.setRoles([1])
            .then(() => res.send({ message: "User was registered successfully"}))
            .catch( err =>  {
                console.log(err);
                res.status(400).send({ message: "error4"})});
        }
    })
    .catch( err =>  {
        console.log(err);
        res.status(500).send({ message: err.message})});
        // .catch(error => res.status(500).json( {error}));
};

//-------------------------------------------------------------------------------------------------

exports.login = (req, res) => {
    User.findOne({ 
        where: {username: req.body.username}
    })
    .then( user=> {
        if(!user) {
            return res.status(404).send({ message: "User Unkown !"})
        }

        const passwordIsValid = bcrypt.compareSync( req.body.password, user.password);
        if(!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid Password !"})
        }

        const token = jwt.sign(
            { uuid: user.uuid }, 
            config.secret, 
            { expiresIn: "24h" }
        );

        const authorities = [];

        user.getRoles()
        .then( roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(201).send({
                uuid: user.uuid,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
    })
    .catch( err => res.status(500).send({ message: err.message }) )
}


//-------------------------------------------------------------------------------------------------

exports.signout = (req, res, next) => { 
    const { email, password } = req.body;
    User.findOne({ where: { email } })
    .then( user => {
        if(!user) {
            return res.status(401).json( {error: " Email or Password Invalid ! 1" } )  
        }
        
        bcrypt.compare( password, user.password)
        .then( valid => {
            if (valid) {
                user.destroy()
                .then(() => res.status(200).json({ message: "Account deleted !" }))
                .catch((err) => res.status(403).json({ err }));
            } else {
                return res.status(401).json( {error: " Email or Password Invalid ! 2" } )
            }
        })
        .catch( error => res.status(500).json( {eeror: error.message} )) 
    })
    .catch( error => res.status(500).json( {eeror: error.message} )) 
}

//-------------------------------------------------------------------------------------------------

exports.adminDeleted = (req, res, next) => {  // by Admin
  const {uuid } = req.body;

  User.findOne({ where: { uuid } })
  .then( user => {
      if(!user) {
          return res.status(401).json( {error: " User Unknown !" } )  
      }

      User.destroy({ where: { uuid } })
      .then(() => res.status(200).json({ message: "Account deleted !" }))
      .catch((err) => res.status(403).json({ err }))
    })
  .catch( error => res.status(500).json( {error: error.message} )) 

  };