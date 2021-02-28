// userRoutes

const express        = require('express');
const router         = express.Router();
const checkRoles     = require('./../middleware/checkRoles.js')
const checkEmail     = require('./../middleware/checkEmail.js')
const userController = require('./../controllers/userController.js')
const auth = require('./../middleware/auth.js');
const authAdmin = require('./../middleware/authAdmin.js');



router.post('/signin',  checkEmail, /* strongPass,*/  checkRoles, userController.signin );
router.post('/login', userController.login  );

router.get ('/'    , /*auth ,*/ userController.getAllUsers );

// router.get ('/:id' ,/*  auth , */ userController.getOneUser );
router.get ('/:uuid' ,/*  auth , */ userController.getOneUser );



// router.put ('/:id'   , /* auth , */ userController.updateUser );
router.put ('/:uuid'   , /* auth , */ userController.updateUser );


// router.delete ('/:id', /* auth , */ userController.deleteUser );    // delete() OR signout() = supprimer son compte
router.delete ('/:uuid', /* auth , */ userController.deleteUser );    // delete() OR signout() = supprimer son compte

module.exports = router;