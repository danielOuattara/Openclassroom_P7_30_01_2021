const express  = require('express');
const router   = express.Router();

const  usersController   = require('../controllers/usersControllers.js')

router.post('/signup', usersController.singup);
router.post('/signout',  usersController.signout);
router.post('/login',  usersController.login);
router.post('/logout',  usersController.logout);

module.exports = router; 