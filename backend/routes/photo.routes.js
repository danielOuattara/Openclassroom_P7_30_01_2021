// PHOTO ROUTES

const router = require('express').Router();
const { authJwt, multer} = require("../middleware");

const controller = require("../controllers/photo.controllers.js");
const controllerLikes = require("../controllers/photo.likes.controllers.js");
const controllerComments = require("../controllers/photo.comments.controllers.js");
// --------------------------------------------------------------------------------------------------


/* Photos
----------------*/
router.post("/",  authJwt, multer, controller.addPhoto);
router.get("/",   authJwt, controller.getAllPhotos);
router.delete("/:photoUuid", authJwt, controller.deleteOnePhoto);

// router.get("/:photoUuid",    authJwt, controller.getOnePhoto);
// router.get("/user/:userUuid",  authJwt, controller.getAllPhotosFromOneUser); // USEFULL ???
// router.delete("/",  authJwt, controller.userDeleteAllPhotos);
// router.delete("/user/:userUuid",  authJwt, controller.deleteAllPhotosFromOneUser);


/*Likes 
-----------------*/
router.post("/:photoUuid/likes", authJwt, controllerLikes.photoLikes);
router.get("/:photoUuid/likes" , authJwt, controllerLikes.photoLikesCounting);


/* Comments
---------------- */
router.post("/:photoUuid/comments", authJwt, controllerComments.createComment);
router.delete("/:photoUuid/comments/:commentUuid", authJwt, controllerComments.deleteOneComment);

router.put("/:photoUuid/comments/:commentUuid", authJwt, controllerComments.updateOneComment);

// router.get("/:photoUuid/comments",  authJwt, controllerComments.getPhotoAllComments);
// router.get("/:photoUuid/comments/:commentUuid", authJwt, controllerComments.getOneComment);
// router.delete("/:photoUuid/comments/",          authJwt, controllerComments.deleteAllCommentsFromOnePhoto);
// router.delete("/user/:userUuid/comments/",      authJwt, controllerComments.deleteAllCommentsFromOneUser);


/* Reports  
--------------- */
router.post("/:photoUuid/report", authJwt, controller.createPhotoReport); 
router.post("/:photoUuid/comments/:commentUuid/report", authJwt, controllerComments.createPhotoCommentReport); 
 


module.exports = router;