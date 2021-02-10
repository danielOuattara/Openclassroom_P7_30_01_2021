const express  = require('express');
const router   = express.Router();

const  usersController   = require('../controllers/usersControllers.js')

router.post('/signup'  , usersController.singup  );
router.post('/signout' , usersController.signout );
router.post('/login'   , usersController.login   );
router.post('/logout'  , usersController.logout  );

router.get ('/:id'     , usersController.getOneUser );
router.get ('/'        , usersController.getAllUsers );

router.put ('/:id'     , usersController.updateOneUser );
router.delete ('/:id'  , usersController.deleteOneUser );


module.exports = router; 