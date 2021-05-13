
// Authentification routes
const router = require('express').Router();
const { checks } = require("./../middleware");
const { authJwt } = require("./../middleware");
const controller = require("./../controllers/auth.controllers.js");
//----------------------------------------------------------------------------


router.post("/signin", checks.email,  checks.duplicateUser, checks.roles , controller.signin );
router.delete("/signout/:userUuid", authJwt, controller.signout );
router.post("/login", controller.login)

module.exports = router ;