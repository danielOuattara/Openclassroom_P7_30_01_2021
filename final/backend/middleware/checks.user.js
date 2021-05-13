
const ROLES = require("../models").ROLES;
const { User } = require('../models');
const validator = require("node-email-validation");

// ------------------------------------------------------------------------------------------------------------------------
const email = (req, res, next) => {
    if (!validator.is_email_valid(req.body.email)) {
        return res.status(400).send({ message: "Error : Invalid email."});
    }
    next();
}

// ------------------------------------------------------------------------------------------------------------------------
const duplicateUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where : {email: req.body.email }});
        if (user) return res.status(400).send({ message: "Error: Choose another email."});
        next();
    } 
    catch(err) { 
        err => res.status(500).send({ message: err.message})
    }
}

// ------------------------------------------------------------------------------------------------------------------------
 const roles = (req, res, next) => {
     try {    
        if(req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!ROLES.includes(req.body.roles[i])) {
                    return res.status(400).send({ message: `Failed ! Role: ${req.body.roles[i]} doesn't exist`})
                }
            }
        }
     } 
     catch(err){
         err => res.status(500).send({ message: err.message})
     }
    next();
}


// ------------------------------------------------------------------------------------------------------------------------
const checks = {
    email,
    duplicateUser,
    roles
};

module.exports = checks;