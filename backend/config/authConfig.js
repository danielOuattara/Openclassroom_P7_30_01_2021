
/*
Configure Auth Key
--------------------

jsonwebtoken functions such as verify() or sign() use algorithm 
that needs a secret key (as String) to encode and decode token.
*/

require('dotenv').config();


module.exports = {
    secret: process.env.SECRET_KEY
  };