
const bcrypt = require("bcryptjs");
const config = require("./../config/auth.config.js");
const db = require("./../models");
const { sequelize, User, Role } = require('./../models');
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

//--------------------------------------------------------------------------

exports.signin = (req, res) =>{

    User.create({  // Save new User to Database
        // username: req.body.username,
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
                .catch( err => res.status(400).send({ message: err.message}));
            })
            .catch( err => res.status(400).send({ message: err.message}));

        } else { // user role = 1
            user.setRoles([1])
            .then(() => res.send({ message: "User was registered successfully"}))
            .catch( err => res.status(400).send({ message: err.message}));
        }
    })
    .catch( err => res.status(500).send({ message: err.message}));
};



//------------------------------------------------------------------------------------------------

exports.signout = (req, res, next) => { 
    User.findOne({ where: { uuid: req.params.userUuid } })
    .then( user => {
        if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
            return res.status(403).json( {error: "Acces Denied ! Violation reported using your IP address" } )  
        }
        user.destroy()
        .then(() => res.status(200).json({ message: "Account successfully deleted !" }))
        .catch((error) => res.status(403).json({ error: error.message }));
    })
    .catch( error => res.status(500).json( {error: error.message} )) 
}
//-------------------------------------------------------------------------------------------------

exports.login = (req, res) => {
    User.findOne({ 
        where: { 
            [Op.or]: [
                {username: req.body.emailOrUsername}, 
                {email: req.body.emailOrUsername} 
            ] 
        }
    })
    .then( user => {
        if(!user) return res.status(401).send({ message: "Error: Type again your login credentials !"});

        const passwordIsValid = bcrypt.compareSync( req.body.password, user.password);
        if(!passwordIsValid) return res.status(401).send({ message: "Error: Type again your login credentials !"});

        const authorities = [];
        user.getRoles()
        .then( roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(201).send({
                accessToken: jwt.sign(
                    {
                        uuid: user.uuid,
                        id: user.id,
                        userRoles: [...authorities]
                    },
                    config.secret,
                    {expiresIn: '5h'}
                )
            });
        })
        .catch( err => res.status(500).send({ message: err.message }) );
    })
    .catch( err => res.status(500).send({ message: err.message }) );
}

//-------------------------------------------------------------------------------------------------


