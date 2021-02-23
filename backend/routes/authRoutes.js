// authRoutes

const express        = require('express');
const router         = express.Router();
const checkRoles     = require('./../middleware/checkRoles.js')
const checkEmail     = require('./../middleware/checkEmail.js')
// const strongPass     = require('./../middleware/strongPass.js')
const userController = require('../controllers/authController.js')


router.post('/signin', checkEmail, /* strongPass, */ checkRoles, userController.signin );
router.post('/signout' , usersController.signout );
router.post('/login'   , userController.login);
