
const  { authJwt } = require("../middleware");
const controller = require("../controllers/photo.controllers.js");
const multer = require("./../middleware/multer.config.js");


module.exports = app => {

    app.use( (req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/photos/", authJwt.verifyToken, multer, controller.addPhoto )
    app.get("/api/photos/", authJwt.verifyToken,          controller.getAllPhoto )
    app.get("/api/photos/:photoUuid", authJwt.verifyToken,  controller.getOnePhoto )
    app.delete("/api/photos/:photoUuid", authJwt.verifyToken,  controller.deleteOne )
    app.delete("/api/photos/", authJwt.verifyToken,  controller.deleteAll )
    app.post("api/photos/:photoUuid/like", authJwt.verifyToken, controller.photoLike )



    // app.get("/api/test/all", controller.allAccess);
    // app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
    // app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
    // app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

    
    // app.get("/api/users/", authJwt.verifyToken, controller.getAllUsers);
    // app.get("/api/users/:uuid", authJwt.verifyToken, controller.getOneUser);
    // app.put("/api/users/:uuid", authJwt.verifyToken, controller.updateUser);

}