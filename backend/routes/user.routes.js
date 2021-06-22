const router = require('express').Router();
const multer = require("./../middleware/multer.config.js");
const { authJwt, checks } = require("./../middleware");

const controller = require("./../controllers/user.controllers.js");

router.get("/userboard" , authJwt, controller.userBoard);
router.get("/adminboard", authJwt, checks.admin, controller.adminBoard);
router.get("/:userUuid" , authJwt, controller.getOneUser);
router.get("/"          , authJwt, checks.admin, controller.getAllUsers);
router.put("/infos/:userUuid" , authJwt, multer, controller.updateUserInfos);
router.put("/avatar/:userUuid/" , authJwt, multer, controller.updateUserAvatar);
router.put("/backgroundimage/:userUuid/" , authJwt, multer, controller.updateUserBackgroundImage);
// router.get("/searchUsers?="  , authJwt,  controller.searchUsers);  // TODO
router.put("/updatepassword/:userUuid", authJwt, controller.updatePassword);
module.exports = router;