
const express        = require('express');
const router         = express.Router();
const checkRoles     = require('./../middleware/checkRoles.js')
const checkEmail     = require('./../middleware/checkEmail.js')
const checkPassword  = require('./../middleware/checkPassword.js')
const userController = require('./../controllers/userController.js')
const auth = require('./../middleware/auth.js');
const authAdmin = require('./../middleware/authAdmin.js');



router.post('/signin', checkEmail, checkRoles, userController.signin );
router.post('/login', userController.login );
router.delete ('/:uuid', auth , userController.deleteUser );    // delete(): by Admin
router.get ('/'    ,/*  auth , */ userController.getAllUsers );
router.get ('/:uuid' ,/*  auth , */ userController.getOneUser );

// router.put ('/:uuid'   , /* auth , */ userController.updateUser );
// router.delete('/signout',/*  auth, */ userController.signout );


module.exports = router;