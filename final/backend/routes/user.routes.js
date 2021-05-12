const router = require('express').Router();
const  { authJwt } = require("./../middleware");
const controller = require("./../controllers/user.controllers.js");
const multer = require("./../middleware/multer.config.js");

// module.exports = app => {

//     app.use( (req, res, next) => {
//         res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//         );
//         next();
//     });

//     app.get("/api/test/all", controller.allAccess);
//     app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
//     app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
//     app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

    
//     app.get("/api/users/", authJwt.verifyToken, controller.getAllUsers);
//     app.get("/api/users/:userUuid", authJwt.verifyToken, controller.getOneUser);
//     app.put("/api/users/:userUuid", authJwt.verifyToken, authJwt.isAdminOrUser, multer, controller.updateUser);

// }

    // tests
    // router.get("/all", controller.allAccess);
    router.get("/user", authJwt, controller.userBoard);
    // router.get("/mod", authJwt, authJwt.isModerator, controller.moderatorBoard);
    router.get("/admin", authJwt, controller.adminBoard);


    router.get("/", authJwt, controller.getAllUsers);
    router.get("/:userUuid", authJwt, controller.getOneUser);
    router.put("/:userUuid", authJwt, multer, controller.updateUser);


    // router.get("/all", controller.allAccess);
    // router.get("/user", [authJwt.verifyToken], controller.userBoard);
    // router.get("/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
    // router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);


    // router.get("/", authJwt.verifyToken, controller.getAllUsers);
    // router.get("/:userUuid", authJwt.verifyToken, controller.getOneUser);
    // router.put("/:userUuid", authJwt.verifyToken, authJwt.isAdminOrUser, multer, controller.updateUser);


    module.exports = router;