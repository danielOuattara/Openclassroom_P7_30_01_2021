const router = require('express').Router();
const multer = require("./../middleware/multer.config.js");
const  { authJwt } = require("./../middleware");

const controller = require("./../controllers/user.controllers.js");


    // tests
    // router.get("/all", controller.allAccess);
    router.get("/user", authJwt, controller.userBoard);
    // router.get("/mod", authJwt, authJwt.isModerator, controller.moderatorBoard);
    router.get("/admin", authJwt, controller.adminBoard);

    router.get("/", authJwt, controller.getAllUsers);
    router.get("/:userUuid", authJwt, controller.getOneUser);
    router.put("/:userUuid", authJwt, multer, controller.updateUser);

    module.exports = router;