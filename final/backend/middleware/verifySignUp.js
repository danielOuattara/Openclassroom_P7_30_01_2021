
const db = require("./../models");
const { User } = require('./../models/');
const ROLES = db.ROLES;
// before changes 


const checkDuplicateUser = (req, res, next) => {

    // username
    User.findOne({ 
        where : {username: req.body.username } 
    })
    .then(user => {
        if (user) {
           return res.status(400).send({ message: "Sorry, Username is used !"});
        }
        User.findOne({
            where: { email: req.body.email}
        })
        .then( user => {
            if (user) {
                return res.status(400).send({message: "Sorry, Email is used !"});
            }
            next();
        })
        .catch( err => res.status(500).send({ message: err.message || ` Server error. Try again later ! `}));
     })
    .catch( err => res.status(500).send({ message: err.message || ` Server error. Try again later ! `}));

};

// -----------------------------------------------------------------------------------------------

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