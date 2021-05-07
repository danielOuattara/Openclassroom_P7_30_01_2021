
const jwt = require('jsonwebtoken');
const config = require('./../config/auth.config.js');
const { User } = require('./../models');



// --------------------------------------------------------------------------
const verifyToken = (req, res, next) => {
    
    let token = req.headers["x-access-token"];
    
    if(!token) {
        return res.status(403).send({message: "No token provided !"});
    }

    jwt.verify( token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({ message: " Unauthorized !"});
        }
        req.userUuid = decoded.uuid;
        req.userId = decoded.id;
        req.userRoles = decoded.userRoles
        next();
    });
};
// --------------------------------------------------------------------------


const isAdmin = (req, res, next) => {
    
    User.findByPk(req.userId)
    .then(user => {
        user.getRoles()
        .then(roles => {
            for(let i = 0; i < roles.length; i ++) {
                if (roles[i].name ==="admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Admin Role!" });
            
            
        });
    });
};
// --------------------------------------------------------------------------


const isModerator = (req, res, next) => {
    User.findByPk(req.userId)
    .then( user => {
        user.getRoles()
        .then( roles => {
            for (let i = 0; i < roles.length; i++) {
                if(roles[i].name ==="moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator Role !"});
        });
    });
};
// --------------------------------------------------------------------------


const isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId)
    .then( user=> {
        user.getRoles()
        .then(roles => {
            for (let i= 0; i< roles.length; i++) {
                if(roles[i].name ==="moderator") {
                    next();
                    return;
                }
                
                if(roles[i].name ==="admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator OR Admin Role !"});
        });
    });
};


const isAdminOrUser = (req, res, next) => {
    User.findByPk(req.userId)
    .then( user => {
        user.getRoles()
        .then(roles => {
            for (let i= 0; i< roles.length; i++) {
                if(roles[i].name ==="admin") {
                    next();
                    return;
                }
                
                if(roles[i].name ==="user") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Admin Or User Role !"});
        });
    });
};
// --------------------------------------------------------------------------


const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin,
    isAdminOrUser,
};
// --------------------------------------------------------------------------


module.exports = authJwt;



