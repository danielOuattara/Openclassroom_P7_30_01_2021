const router = require('express').Router();
const multer = require("./../middleware/multer.config.js");
const { authJwt } = require("./../middleware");

const controller = require("./../controllers/user.controllers.js");

router.get("/userboard" , authJwt, controller.userBoard);
router.get("/adminboard", authJwt, controller.adminBoard);
router.get("/"          , authJwt, controller.getAllUsers);
router.get("/:userUuid" , authJwt, controller.getOneUser);
router.put("/:userUuid" , authJwt, multer, controller.updateUser);

module.exports = router;