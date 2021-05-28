const router = require('express').Router();
const { authJwt, multer, checksPhoto, checks} = require("../middleware");

const controller = require("../controllers/photo.controllers.js");
const controllerLikes = require("../controllers/photo.likes.controllers.js");
const controllerComments = require("../controllers/photo.comments.controllers.js");
// --------------------------------------------------------------------------------------------------

router.post("/",             authJwt, /* checksPhoto.title, checksPhoto.image, */ multer, controller.addPhoto);
router.get("/",              authJwt, controller.getAllPhoto);
router.get("/:photoUuid",    authJwt, checksPhoto.photoKnown, controller.getOnePhoto);
router.delete("/:photoUuid", authJwt, checksPhoto.photoKnown, checks.ownerOrAdmin, controller.deleteOnePhoto);
router.delete("/",           authJwt, checks.ownerOrAdmin, controller.deleteUserAllPhoto);
router.delete("/:userUuid",  authJwt, controller.deleteAllPhotoFromOneUser);

router.post("/:photoUuid/likes", authJwt, controllerLikes.photoLikes);
router.get("/:photoUuid/likes", authJwt, controllerLikes.photoLikesCounting);

router.post("/:photoUuid/comments",                authJwt, checksPhoto.photoKnown,  controllerComments.createComment);
router.get("/:photoUuid/comments",                 authJwt, controllerComments.getPhotoAllComment);
router.get("/:photoUuid/comments/:commentUuid",    authJwt, controllerComments.getOneComment);
router.put("/:photoUuid/comments/:commentUuid",    authJwt, controllerComments.updateOneComment);
router.delete("/:photoUuid/comments/:commentUuid", authJwt, controllerComments.deleteOneComment);
router.delete("/:photoUuid/comments/",             authJwt, controllerComments.deleteAllCommentFromOnePhoto);
router.delete("/:userUuid/comments/",              authJwt, controllerComments.deleteAllCommentFromOneUser);

module.exports = router;