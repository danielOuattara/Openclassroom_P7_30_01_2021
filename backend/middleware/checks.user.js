
const ROLES = require("../models").ROLES;
const validator = require("node-email-validation");
const config = require('../config/auth.config.js');
// -----------------------------------------------------------------------------

const email = (req, res, next) => {
    if (!validator.is_email_valid(req.body.email)) {
        return res.status(400).send("Invalid email.");
    }
    next();
}

// ------------------------------------------------------------------------------

const password = (req, res, next) => {
    if (!req.body.password) {
        return res.status(400).send("Password is required.");
    }

    // 'Password not strong ?'
    // if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?&#@$%µ€_])[a-zA-Z0-9!?&#@$%µ€_]{7,}/.test(req.body.password)) {
    //     return res.status(400).json( `Password not Strong! :  7 characters at least 1 Uppercase,
    //                                           1 Lowercase, 1 Digit, 1 symbol between: ! ? & # @ $ % µ € _ `);
    // }
    next();
}
// -----------------------------------------------------------------------------

    const emailOrUsername = (req, res, next) => {
        if (!req.body.emailOrUsername) {
            return res.status(400).send("Provide email OR username");
        }
        next();
    }

// -----------------------------------------------------------------------------

const roles = (req, res, next) => {
    try {    
        if(req.body.roles) {
            if( !req.body.special || req.body.special != config.specialRolePassword) {
                return res.status(401).send("Not authorized for special role attribution")
            }
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!ROLES.includes(req.body.roles[i])) {
                    return res.status(400).send(`Role = '${req.body.roles[i]}' doesn't exist`)
                }
            }
        }
        next();
    } 
    catch(err){
        return res.status(500).json(err.message)
    }
}
// ------------------------------------------------------------------------------

const admin = (req, res, next) => {
        if(!req.userRoles.includes("ROLE_ADMIN")){
            return res.status(403).send("Non Authorized !")  
        }
        next();
}

// ------------------------------------------------------------------------------

const checks = {
    email,
    emailOrUsername,
    password,
    roles, 
    admin,
};

module.exports = checks;