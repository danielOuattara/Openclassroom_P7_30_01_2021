
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

    app.post("/api/photos/", authJwt.verifyToken, multer, controller.addPhoto);
    app.get("/api/photos/", authJwt.verifyToken,          controller.getAllPhoto);
    app.get("/api/photos/:photoUuid", authJwt.verifyToken,  controller.getOnePhoto);
    app.delete("/api/photos/:photoUuid", authJwt.verifyToken,  controller.deleteOnePhoto);
    app.delete("/api/photos/", authJwt.verifyToken,  controller.deleteAllPhoto);

    app.post("api/photos/:photoUuid/like", authJwt.verifyToken, controller.photoLike);

    app.post("/api/photos/:photoUuid/comments", authJwt.verifyToken, controller.createComment);
    app.get("/api/photos/:photoUuid/comments", authJwt.verifyToken, controller.getAllComment);
    app.get("/api/photos/:photoUuid/comments/:commentUuid", authJwt.verifyToken, controller.getOneComment);
    app.put("/api/photos/:photoUuid/comments/:commentUuid", authJwt.verifyToken, controller.updateOneComment);
    app.delete("/api/photos/:photoUuid/comments/:commentUuid", authJwt.verifyToken, controller.deleteOneComment);
    app.delete("/api/photos/:photoUuid/comments/", authJwt.verifyToken, controller.deleteAllCommentFromOnePhoto);
    app.delete("/api/users/:userUuid/comments/", authJwt.verifyToken, controller.deleteAllCommentFromOneUser);
    app.delete("/api/users/:userUuid/photos/", authJwt.verifyToken, controller.deleteAllPhotoFromOneUser);

}