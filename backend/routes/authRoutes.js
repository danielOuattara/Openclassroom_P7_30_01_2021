// authRoutes

const express        = require('express');
const router         = express.Router();
const auth           = require('./../middleware/auth.js')
const authAdmin      = require('./../middleware/authAdmin.js')
const authController = require("./../controllers/authController");


router.get('/user' ,  auth      , authController.userBoard );
router.get('/admin',  authAdmin , authController.adminBoard )


module.exports = router;

