// authRoutes

const express        = require('express');
const router         = express.Router();
const auth           = require('./../middleware/auth.js')
const authController = require("./../controllers/authController");
const authAdmin      = require('./../middleware/authAdmin.js')


router.get('/user',  auth ,             authController.userBoard );
router.get('/admin', auth , authAdmin , authController.adminBoard )


module.exports = router;

