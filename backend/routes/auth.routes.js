
// Authentification routes
const router = require('express').Router();
const { authJwt, checks } = require("./../middleware");
const controller = require("./../controllers/auth.controllers.js");
//----------------------------------------------------------------------------

router.post("/signin", checks.email, checks.duplicateUser, checks.password, checks.roles , controller.signin );
router.post("/login" , checks.password, controller.login)
router.delete("/signout/:userUuid", authJwt, controller.signout );

module.exports = router ;