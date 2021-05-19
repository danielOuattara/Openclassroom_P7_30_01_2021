const router = require('express').Router();
const multer = require("./../middleware/multer.config.js");
const { authJwt, checks } = require("./../middleware");

const controller = require("./../controllers/user.controllers.js");

router.get("/userboard" , authJwt,         controller.userBoard);
router.get("/adminboard", authJwt,         checks.admin, controller.adminBoard);
router.get("/:userUuid" , authJwt,         checks.userKnown, controller.getOneUser);
router.get("/"          , authJwt,         checks.admin, controller.getAllUsers);
router.put("/:userUuid" , authJwt, multer, checks.userKnown, checks.ownerOrAdmin, controller.updateUser);

module.exports = router;