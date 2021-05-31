const router = require('express').Router();
const { authJwt, multer} = require("../middleware");

const controller = require("../controllers/photo.controllers.js");
const controllerLikes = require("../controllers/photo.likes.controllers.js");
const controllerComments = require("../controllers/photo.comments.controllers.js");
// --------------------------------------------------------------------------------------------------

router.post("/",  authJwt, multer, controller.addPhoto);
router.get("/",   authJwt, controller.getAllPhotos);
router.get("/:photoUuid",    authJwt, controller.getOnePhoto);
router.get("/user/:userUuid",  authJwt, controller.getAllPhotosFromOneUser);
router.delete("/:photoUuid", authJwt, controller.deleteOnePhoto);
router.delete("/",  authJwt, controller.userDeleteAllPhotos);
router.delete("/user/:userUuid",  authJwt, controller.deleteAllPhotosFromOneUser);
// router.get("/search/:photoUuid",  authJwt, controller.getOnePhoto); // TODO

router.post("/:photoUuid/likes", authJwt, controllerLikes.photoLikes);
router.get("/:photoUuid/likes" , authJwt, controllerLikes.photoLikesCounting);

router.post("/:photoUuid/comments", authJwt, controllerComments.createComment);
router.get("/:photoUuid/comments",  authJwt, controllerComments.getPhotoAllComments);
router.get("/:photoUuid/comments/:commentUuid",    authJwt, controllerComments.getOneComment);
router.put("/:photoUuid/comments/:commentUuid",    authJwt, controllerComments.updateOneComment);
router.delete("/:photoUuid/comments/:commentUuid", authJwt, controllerComments.deleteOneComment);
router.delete("/:photoUuid/comments/",             authJwt, controllerComments.deleteAllCommentsFromOnePhoto);
router.delete("/user/:userUuid/comments/",              authJwt, controllerComments.deleteAllCommentsFromOneUser);

module.exports = router;