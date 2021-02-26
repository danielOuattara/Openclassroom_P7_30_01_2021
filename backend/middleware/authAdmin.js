const db = require("../models");
const User = db.user;


module.exports = (req, res, next) => {
    User.findByPk(req.userId)
    .then( user => { 
        user.getRoles()
        .then(roles => { 
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            return res.status(403).send({ message: "Require Admin Role!" });
        });
    });
};

