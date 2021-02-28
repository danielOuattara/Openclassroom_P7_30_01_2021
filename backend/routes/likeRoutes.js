const express          = require('express');
const router           = express.Router();
const auth             = require('./../middleware/auth.js');
const likeControllers = require('./../controllers/likeController.js');

router.post('/:id/likes'       , auth, likeControllers.create );
router.get('/:id/likes'        , auth, likeControllers.getAll);
router.get('/:id/likes/:id'    , auth, likeControllers.get);
router.put('/:id/likes/:id'    , auth, likeControllers.update);
router.delete('/:id/likes/:id' , auth, likeControllers.delete);
router.delete('/:id/like/'     , auth, likeControllers.deleteAll);

// ---------------------------------------------------------------------------------

module.exports = router;