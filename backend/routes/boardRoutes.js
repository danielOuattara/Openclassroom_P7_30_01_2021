
const express        = require('express');
const router         = express.Router();
const auth           = require('./../middleware/auth.js')
const boardController = require("./../controllers/boardController");
const authAdmin      = require('./../middleware/authAdmin.js')


router.get('/all',                      boardController.allAccess);
router.get('/user',  auth ,             boardController.userBoard );
router.get('/admin', auth , authAdmin , boardController.adminBoard )


module.exports = router;