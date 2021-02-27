
const  jsonwebtoken = require('jsonwebtoken');
const  config = require('./../config/authConfig.js')

module.exports  = (req, res, next) => {

    try {
        const token        = req.headers.authorization.split(' ')[1];
        const decodedToken = jsonwebtoken.verify(token, config.secret);
        const userId       = decodedToken.userId;
        // const isAdmin = decodedToken.role;
        // req.userId = userId;
        // req.isAdmin = isAdmin;
        if (req.body.userId && req.body.userId != userId) {
            throw 'User ID Not Valid'
        } else {
            next();
        }

    } catch (error) {
        res.status(401).json( {error})
    }
}
