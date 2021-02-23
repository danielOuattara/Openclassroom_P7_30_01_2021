// userRoutes

const express        = require('express');
const router         = express.Router();
const userController = require('../controllers/userController.js');
const auth = require('./../middleware/auth.js');
const authAdmin = require('./../middleware/authAdmin.js');

router.get ('/:id' , auth , userController.getOneUser );
router.get ('/'    , auth , userController.getAllUsers );

router.put ('/:id'     , authAdmin , userController.updateUser );
router.delete ('/:id'  , authAdmin , userController.deleteUser );

module.exports = router;