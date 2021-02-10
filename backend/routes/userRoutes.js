const express  = require('express');
const router   = express.Router();

const  usersController   = require('../controllers/usersControllers.js')

router.post('/signup'  , usersController.singup  );
router.post('/login'   , usersController.login   );
router.post('/logout'  , usersController.logout  );
router.post('/signout' , usersController.signout );
router.get ('/:id'     , usersController.getOneUser );
router.get ('/'        , usersController.getAllUsers );


module.exports = router; 