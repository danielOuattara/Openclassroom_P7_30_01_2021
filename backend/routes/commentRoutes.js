const express          = require('express');
const router           = express.Router();
const auth             = require('./../middleware/auth.js');
const commentControllers = require('./../controllers/commentController.js');


// ---------------------------------------------------------------------------------

router.post('/:id/comments'       , auth, commentControllers.create );
router.get('/:id/comments'        , auth, commentControllers.getAll);
router.get('/:id/comments/:id'    , auth, commentControllers.getOne);
router.put('/:id/comments/:id'    , auth, commentControllers.update);
router.delete('/:id/comments/:id' , auth, commentControllers.delete);
router.delete('/:id/comments/:id' , auth, commentControllers.deleteAll);


module.exports = router;