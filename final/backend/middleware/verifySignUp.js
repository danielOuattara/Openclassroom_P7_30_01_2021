
const db = require("./../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUser = (req, res, next) => {

    // username
    User.findOne({ 
        where : {username: req.body.username } 
    })
    .then(user => {
        if (user) {
           return res.status(400).send({ message: "Failed ! Username in use !"});
        }
        User.findOne({
            where: { email: req.body.email}
        })
        .then( user => {
            if (user) {
                return res.status(400).send({message: "FAiled, email in use !"});
            }
            next();
        })
     })
    .catch( err => res.status(500).send({ message: err.message || ` Some error occured `}));

};

const checkRoles = (req, res, next) => {

    if(req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).send({ message: `Failed ! Role: ${req.body.roles[i]} doesn't exist`})
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateUser,
    checkRoles
};

module.exports = verifySignUp;