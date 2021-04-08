
const  jsonwebtoken = require('jsonwebtoken');
const  config = require('./../config/authConfig.js')

module.exports  = (req, res, next) => {
    console.log(req.body)
    console.log(req.headers)

    try {
        const token = req.headers['x-access-token']
        const decodedToken = jsonwebtoken.verify(token, config.secret);
        console.log("decodedToken", decodedToken);
        const userUuid  = decodedToken.userUuid;
        const roles = decodedToken.userRole

        if (req.body.userUuid && req.body.userUuid != userUuid  || roles && roles.includes("ROLE_ADMIN")== false) {
            throw 'User ID Not Valid'
        } else {
            next();
        }

    } catch (error) {
        res.status(401).json( {error: error |"Token validation failed"})
    }
}
