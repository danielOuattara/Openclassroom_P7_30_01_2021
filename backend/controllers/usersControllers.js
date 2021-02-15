const bcrypt       = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User         = require('./../models');
const validator    = require('email-validator');

const TOKEN        = process.env.TOKEN;

//---------------------------------------------------------------------------------------

exports.singup = (req, res, next) => {  

    // 'Password not strong ?'
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?&#@$%µ€_])[a-zA-Z0-9!?&#@$%µ€_]{7,}/.test(req.body.password)) {   
        return res.status(401).json({ error: `Password not Strong! :  7 characters at least 1 Uppercase, 
                                              1 Lowercase, 1 Digit, 1 symbol between: ! ? & # @ $ % µ € _ `});       
    } 
             
    bcrypt.hash( req.body.password, 13)   // password crypting
    .then( hash => {
        const user =  {    // new user created
                email: req.body.email,
                password: hash
        };
        User.create(user)
        .then( data => res.send(data))
        .catch( err => res.status(500).send({ message: err.message || ` Some error occured while creating the Tutorial in DB`}))
    })
    .catch( err => res.status(500).send({ message: err.message || ` Some error occured while crypting Password`}))
}



// -----------------------------------------------------------------------------------------

exports.login = (req, res, next) => {  
   
    if (!validator.validate(req.body.email)) {
        return res.status(401).json({error:" Email invalid !" } )      
    }

    const emai

    User.findByPk


    
    User.findOne( {email: req.body.email})
    .then( user => {
        if(!user) {
            return res.status(401).json( {error: " Email or Password unknown !" } )  
        }
        bcrypt.compare( req.body.password, user.password)
        .then( valid => {
            if(valid) {
                res.status(200).json( 
                    { 
                       userId: user._id,
                       token: jsonwebtoken.sign( { userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '1h' } )
                    }
                )
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

exports.signout = (req, res, next) => {}

// -----------------------------------------------------------------------------------------

exports.getOneUser = (req, res, next) => {}

// -----------------------------------------------------------------------------------------

exports.getAllUsers = (req, res, next) => {}

// -----------------------------------------------------------------------------------------

exports.updateOneUser = (req, res, next) => {}

// -----------------------------------------------------------------------------------------

exports.deleteOneUser = (req, res, next) => {}

// -----------------------------------------------------------------------------------------
