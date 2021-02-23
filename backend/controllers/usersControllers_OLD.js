// const bcrypt       = require('bcrypt');
const db           = require('./../models');
const config       = require('../config/authConfig.js');
const User         = db.user;
const Role         = db.role;
const Op           = db.Sequelize.Op;
const jsonwebtoken = require('jsonwebtoken');
const bcrypt       = require('bcryptjs');
// const validator    = require('email-validator');

const TOKEN        = process.env.TOKEN;   // ??

//---------------------------------------------------------------------------------------

exports.singup = (req, res, next) => {  

    // 'Password strong ?'
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?&#@$%µ€_])[a-zA-Z0-9!?&#@$%µ€_]{7,}/.test(req.body.password)) {   
        return res.status(401).json({ error: `Password not Strong! :  7 characters at least 1 Uppercase, 
                                              1 Lowercase, 1 Digit, 1 symbol between: ! ? & # @ $ % µ € _ `});       
    } 
             
    // bcrypt.hash( req.body.password, 13)   // password crypting
    // .then( hash => {
    //     const user =  {    // new user ready            
    //         email: req.body.email,
    //         password: hash
    //     };

    User.create( {
        email: req.body.email,
        password: bcrypt.hash(req.body.password)
    })   // // new user created
    .then( newUser => {
        if(req.body.roles) {
            Role.findAll( {
                where: { 
                    name: { [Op.or]: req.body.roles }
                }
            })
            .then( roles => {
                newUser.setRoles(roles)
                .then(() => res.send( { message: 'User was registered successfully'}))
                .catch()
            })
            .catch()
        
        } else {
            // user role = 1
            newUser.setRoles([1])
            .then( () => res.send({message: 'User was registered succesfully'})  )
            .catch()
        }
    })
    .catch( err => res.status(500).send({ message: err.message || ` Some error occured while creating the Tutorial in DB`}))
    // })
    // .catch( err => res.status(500).send({ message: err.message || ` Some error occured while crypting Password`}))
}

// -----------------------------------------------------------------------------------------

exports.signout = (req, res, next) => {

    User.findOne( {
        where: { email: req.body.email }
    })

    .then( user => {
        if(!user) {
            return res.status(401).json( {error: " Email or Password unknown !" } )  
        }

        bcrypt.compare( req.body.password, user.password)
        .then(() => {
            if (user.id === req.params.id) {
                User.destroy({
                    where: { id: req.params.id}
                })
                .then(() => res.status(200).json({ message: "Account deleted !" }))
                .catch((err) => res.status(403).json({ err }));
            }
            
        })
        .catch( res.status(401).json( {error: ' Email or Password unknown !'} ) )
    })
    .catch( error => res.status(500).json( {error} ))  
}

// -----------------------------------------------------------------------------------------

exports.login = (req, res, next) => {  
   
    User.findOne(  {
        where: {  email: req.body.email }
    })
    .then( user => {
        if(!user) {
            return res.status(401).json( {error: " Email or Password unknown !" } )  
        }

        bcrypt.compare( req.body.password, user.password)
        .then( valid => {

            if(valid) {

                const authorities = [];
                const token = jwt.sign( {id: user.id}, config.secret, {expiresIn: 3600});
                
                user.getRoles()
                .then( roles => {

                    for (let i = 0; i < roles.length; i ++ ) {
                        authorities.push("ROLE_" + roles[i].name.toUpperCase());
                    }

                    res.status(200).json( { 
                        id:    user.id,
                        email: user.email,
                        roles: authorities,
                        accessToken: token
                    });
                })
                .catch()
                
            } else {          
                return res.status(401).json( {error: ' Email or Password unknown !'} )    // Password Not Recognized
            }
        })
        .catch( error => res.status(500).json( {error} ))
    })
    .catch( error => res.status(500).json( {error} ))
}
            
// -----------------------------------------------------------------------------------------

exports.logout = (req, res, next) => {}

// -----------------------------------------------------------------------------------------


