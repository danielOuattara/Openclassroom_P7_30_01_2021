const { verifySignUp } = require("./../middleware");
const { authJwt } = require("./../middleware");
const controller = require("./../controllers/admin.controllers.js");


module.exports = app => {
    app.use( (req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.delete("/api/auth/admin/delete/:userUuid",  authJwt.verifyToken, authJwt.isAdmin , controller.deleteUser);
};