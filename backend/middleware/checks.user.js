
const ROLES = require("../models").ROLES;
const { User } = require('../models');
const validator = require("node-email-validation");
const config = require('../config/auth.config.js');
// -----------------------------------------------------------------------------

const email = (req, res, next) => {
    if (!validator.is_email_valid(req.body.email)) {
        return res.status(400).json("Error : Invalid email.");
    }
    next();
}
// --------------------------------------------------------------------------

const duplicateUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where : {email: req.body.email }});
        if (user) {
            return res.status(400).json("Error : Choose another email.");
        }
        next();
    } 
    catch(err) { 
        err => res.status(500).send(err.message)
    }
}
// ------------------------------------------------------------------------------

const password = (req, res, next) => {
    if (!req.body.password) {
        return res.status(400).json("Error : Password is required.");
    }

    // 'Password not strong ?'
    // if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?&#@$%µ€_])[a-zA-Z0-9!?&#@$%µ€_]{7,}/.test(req.body.password)) {
    //     return res.status(400).json( `Password not Strong! :  7 characters at least 1 Uppercase,
    //                                           1 Lowercase, 1 Digit, 1 symbol between: ! ? & # @ $ % µ € _ `);
    // }
    next();
}
// -----------------------------------------------------------------------------

const roles = (req, res, next) => {
    try {    
        if(req.body.roles) {
            // const specialPassword = "1_superPassword!";
            if( !req.body.special || req.body.special != config.specialRolePassword) {
                return res.status(401).send("Not authorized for special role attribution")
            }
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!ROLES.includes(req.body.roles[i])) {
                    return res.status(400).json(`Error :  Role = '${req.body.roles[i]}' doesn't exist`)
                }
            }
        }
    } 
    catch(err){
        err => res.status(500).json(err.message)
    }
    next();
}
// ------------------------------------------------------------------------------

const admin = (req, res, next) => {
        if(!req.userRoles.includes("ROLE_ADMIN")){
            return res.status(403).json({ Error : "Non Authorized !" })  
        }
        next();
}

// ------------------------------------------------------------------------------

const checks = {
    email,
    password,
    duplicateUser,
    roles, 
    admin,
};

module.exports = checks;