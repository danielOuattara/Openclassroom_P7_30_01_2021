
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

// --------------------------------------------------------------------------
module.exports = (req, res, next) => {
    try {
        console.log("req = " , req.body)
        const token = req.headers["x-access-token"];
        if(!token) return res.status(401).send({message: " Error : No token provided !"});
        jwt.verify( token, config.secret, (err, decoded) => {
            if(err) return res.status(401).send({ message: " Error : Unauthorized !"});
            req.userUuid = decoded.uuid;
            req.userId = decoded.id;
            req.userRoles = decoded.userRoles;
        });
    }    
    catch(err) { 
        err => res.status(500).send({ message: err.message})
    }
    next();
};
