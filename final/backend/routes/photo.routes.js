const router = require('express').Router();
const { authJwt, multer, checksPhoto,} = require("../middleware");

const controller = require("../controllers/photo.controllers.js");
const controllerLikes = require("../controllers/photo.likes.controllers.js");
const controllerComments = require("../controllers/photo.comments.controllers.js");

// --------------------------------------------------------------------------------------------------
router.post("/",             authJwt,  multer, checksPhoto.imageUrl,  checksPhoto.title,  controller.addPhoto);
router.get("/",              authJwt, controller.getAllPhoto);
router.get("/:photoUuid",    authJwt, controller.getOnePhoto);
router.delete("/:photoUuid", authJwt, controller.deleteOnePhoto);
router.delete("/",           authJwt, controller.deleteAllPhoto);

router.post("/:photoUuid/like", authJwt, controllerLikes.photoLike);

router.post("/:photoUuid/comments",                authJwt, controllerComments.createComment);
router.get("/:photoUuid/comments",                 authJwt, controllerComments.getAllComment);
router.get("/:photoUuid/comments/:commentUuid",    authJwt, controllerComments.getOneComment);
router.put("/:photoUuid/comments/:commentUuid",    authJwt, controllerComments.updateOneComment);
router.delete("/:photoUuid/comments/:commentUuid", authJwt, controllerComments.deleteOneComment);
router.delete("/:photoUuid/comments/",             authJwt, controllerComments.deleteAllCommentFromOnePhoto);
router.delete("/api/users/:userUuid/comments/",    authJwt, controllerComments.deleteAllCommentFromOneUser);
router.delete("/api/users/:userUuid/photos/",      authJwt, controllerComments.deleteAllPhotoFromOneUser);

module.exports = router;