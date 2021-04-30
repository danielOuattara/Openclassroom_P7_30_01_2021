// check duplicate email

const validator = require('email-validator')
const { User } = require('../models');

module.exports = (req, res, next) => {   // check for duplicate user email or username

    if (!validator.validate(req.body.email)) {
      return res.status(401).json({error:" Email invalid !" } )
    }

    // const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?&#@$%µ€_])[a-zA-Z0-9!?&#@$%µ€_]{7,}/
    // if (!regex.test(req.body.password)) {
    //       return res.status(401).json({ error: `Password not Strong!: 7 characters, at least 1 Uppercase, 1 Lowercase, 1 Digit, 1 symbol between ! ? & # @ $ % µ € _ `});
    // }

    User.findOne({ 
        where: { email: req.body.email }
    })
    .then(user => {
        if (user) {
            return res.status(400).send({ message: " Email address is already used!" });
        } 
        next();
    })
    .catch( error =>  res.status(500).json( {error}))
  }


