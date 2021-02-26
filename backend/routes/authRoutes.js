// authRoutes

const express        = require('express');
const router         = express.Router();
const checkEmail     = require('./../middleware/checkEmail.js')
const checkPassword     = require('./../middleware/strongPass.js')
const checkRoles     = require('./../middleware/checkRoles.js')
const authController = require('../controllers/authController.js')


router.post('/signin', checkEmail, checkPassword, checkRoles, authController.signin );
router.post('/signout' , usersController.signout );
router.post('/login'   , userController.login);
