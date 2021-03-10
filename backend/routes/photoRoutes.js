const express          = require('express');
const router           = express.Router();
const auth             = require('./../middleware/auth.js');
const photoControllers = require('./../controllers/photoControllers.js');
const multer           = require('./../middleware/multer-config.js');


router.post('/'         ,  auth, multer, photoControllers.addPhoto       );
router.get('/'          ,  auth,         photoControllers.getAllPhoto    );
router.get('/:id'       ,  auth,         photoControllers.getOnePhoto    );
router.delete('/:id'    ,  auth,         photoControllers.deleteOnePhoto );
router.delete('/'       ,  auth,         photoControllers.deleteAllPhoto );

// ---------------------------------------------------------------------------------

router.post('/:id/comments'       , auth, photoControllers.addComment       );
router.get('/:id/comments'        , auth, photoControllers.getAllComments   );
router.get('/:id/comments/:id'    , auth, photoControllers.getOneComment    );
router.put('/:id/comments/:id'    , auth, photoControllers.updateOneComment );
router.delete('/:id/commnets/:id' , auth, photoControllers.deleteOneComment );

// ----------------------------------------------------------------------------------

router.post('/:id/like' ,  auth,         photoControllers.userLikePhoto  );

module.exports = router;