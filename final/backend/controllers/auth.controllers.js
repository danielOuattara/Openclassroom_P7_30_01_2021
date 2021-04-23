
const config = require("./../config/auth.config.js");
const db = require("./../models");
const { User, Role } = require('./../models');
// const Role = db.role;
const { Op } = require('sequelize')
// const Op = db.Sequelize.Op;


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.signup = (req ,res) =>{

    User.create({  // Save new User to Database
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then( user => { 
        if(req.body.roles) {
            Role.findAll({ 
                where : {
                    name: {[Op.or]: req.body.roles}
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

exports.signin = (req, res) => {
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
            { id:user.id}, 
            config.secret, 
            {expiresIn: 3600}
        );

        const authorities = [];

        user.getRoles()
        .then( roles => {
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
    .catch( err => res.status(500).send({ message: err.message }) )
}