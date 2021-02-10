const express          = require('express');
const router           = express.Router();
const auth             = require('../auth/auth.js');
const photosControllers = require('../controllers/photosControllers.js');
const multer           = require('../auth/multer-config.js');


router.post('/',         auth, multer, photosControllers.addPhoto );
router.post('/:id/like', auth,         photosControllers.userLikePhoto ) ;
router.delete('/:id',    auth,         photosControllers.deleteOnePhoto );
router.put('/:id',       auth, multer, photosControllers.updatePhoto );
router.get('/:id',       auth,         photosControllers.getOnePhoto );




router.get('/',          auth,         photosControllers.getAllPhoto );


module.exports = router;