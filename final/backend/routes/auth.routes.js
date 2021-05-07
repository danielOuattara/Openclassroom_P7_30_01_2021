
// Authentification routes

const { verifySignUp } = require("./../middleware");
const { authJwt } = require("./../middleware");
const controller = require("./../controllers/auth.controllers.js");


module.exports = app => {
    app.use( (req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/auth/signin",  verifySignUp.checkDuplicateUser, verifySignUp.checkRoles , controller.signin );
    app.delete("/api/auth/signout/:userUuid", authJwt.verifyToken, authJwt.isAdminOrUser,controller.signout );
    app.post("/api/auth/login", controller.login)
    
};