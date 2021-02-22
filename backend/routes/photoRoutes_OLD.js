const express          = require('express');
const router           = express.Router();
const auth             = require('../auth/auth.js');
const photosControllers = require('../controllers/photosControllers.js');
const multer           = require('../auth/multer-config.js');


router.post('/'         ,  auth, multer, photosControllers.addPhoto       );
router.post('/:id/like' ,  auth,         photosControllers.userLikePhoto  );
router.get('/'          ,  auth,         photosControllers.getAllPhoto    );
router.get('/:id'       ,  auth,         photosControllers.getOnePhoto    );
router.put('/:id'       ,  auth, multer, photosControllers.updatePhoto    );
router.delete('/:id'    ,  auth,         photosControllers.deleteOnePhoto );
router.delete('/'       ,  auth,         photosControllers.deleteOnePhoto );

// ---------------------------------------------------------------------------------

router.post('/:id/comments'       ,    auth,         photosControllers.addComment       );
router.get('/:id/comments'        ,    auth,         photosControllers.getAllComments   );
router.get('/:id/comments/:id'    ,    auth,         photosControllers.getOneComment    );
router.put('/:id/comments/:id'    ,    auth, multer, photosControllers.updateOneComment );
router.delete('/:id/commnets/:id' ,    auth,         photosControllers.deleteOneComment );


module.exports = router;