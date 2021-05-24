
const ROLES = require("../models").ROLES;
const { User } = require('../models');
const validator = require("node-email-validation");

// -----------------------------------------------------------------------------

const email = (req, res, next) => {
    if (!validator.is_email_valid(req.body.email)) {
        return res.status(400).json("Error : Invalid email.");
    }
    next();
}
// -----------------------------------------------------------------------------

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

// --------------------------------------------------------------------------

const emailOrUsername = (req, res, next) => {
    if (!req.body.emailOrUsername) {
        return res.status(400).json("Error : Provide email OR username");
    }
    next();
}
// ------------------------------------------------------------------------------

const userKnown = async (req, res, next) => {
    try {
        const user = await User.findOne({ where : {uuid: req.params.userUuid }});
        if (!user) {
            return res.status(404).json({ Error: "User unknown TEST !"});
        }
        next();
    } 
    catch(err) { 
        err => res.status(500).json(err.message)
    }
}

// ------------------------------------------------------------------------------

const ownerOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ where : {uuid: req.params.userUuid }});
        if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
            return res.status(403).json({ Error : "Non Authorized !" })  
        }
        next();
    } 
    catch(err) { 
        err => res.status(500).json(err.message)
    }
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
    emailOrUsername,
    password,
    duplicateUser,
    roles, 
    userKnown,
    ownerOrAdmin,
    admin,
};

module.exports = checks;