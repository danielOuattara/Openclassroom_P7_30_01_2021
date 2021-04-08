
const express         = require('express');
const router          = express.Router();
const checkRoles      = require('./../middleware/checkRoles.js')
const checkDataSignin = require('../middleware/checkDataSignin.js')
const userController  = require('./../controllers/userController.js')
const authAdmin       = require('./../middleware/authAdmin.js');
const auth            = require('./../middleware/auth.js');


router.post('/signin', checkDataSignin, checkRoles, userController.signin );
router.post('/login' , userController.login );
router.delete ('/signout', auth , userController.signout );    // user himself
router.put ('/:uuid' , auth , userController.updateUser );
router.get ('/'      , auth , userController.getAllUsers );
router.get ('/:uuid' , auth , userController.getOneUser );

router.delete ('/adminDeleted', authAdmin ,  userController.adminDeleted);  // Admin


module.exports = router;