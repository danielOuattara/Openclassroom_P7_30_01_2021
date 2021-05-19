
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

// --------------------------------------------------------------------------
module.exports = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if(!token)  {
            return res.status(401).json("Token not provided !");
        }
        jwt.verify( token, config.secret, (err, decoded) => {
            if(err) return res.status(401).json({ Error : "Unauthorized !"});
            req.userUuid = decoded.uuid;
            req.userId = decoded.id;
            req.userRoles = decoded.userRoles;
        });
    }    
    catch(err) { 
        err => res.status(401).json(err.message)
    }
    next();
};

