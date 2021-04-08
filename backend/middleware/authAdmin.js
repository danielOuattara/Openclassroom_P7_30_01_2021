// const db = require("../models");
// const User = db.user;
// const Role = db.role;


// module.exports = (req, res, next) => {
//     const { userUuid } = req.uuid
//     User.findOne(  {where: {userUuid }})
//     .then( user => { 
//         user.getRoles()
//         .then(roles => { 
//             for (let i = 0; i < roles.length; i++) {
//                 if (roles[i].name === "admin") {
//                     next();
//                     return;
//                 }
//             }
//             return res.status(403).send({ message: "Require Admin Role!" });
//         })
//         .catch(error => res.status(500).json( {error}))
//     });
// };




const  jsonwebtoken = require('jsonwebtoken');
const  config = require('./../config/authConfig.js')

module.exports  = (req, res, next) => {
    console.log(req.body)
    console.log(req.headers)

    try {
        const token = req.headers['x-access-token']
        const decodedToken = jsonwebtoken.verify(token, config.secret);
        const roles = decodedToken.userRole
        if (req.body.userUuid && req.body.userUuid != userUuid  || roles && roles.includes("ROLE_ADMIN")== false) {
            return res.status(403).send({ message: "Require Admin Role!" });
        } else {
            next();
        }

    } catch (error) {
        res.status(401).json( {error: error |"Token validation failed"})
    }
}
