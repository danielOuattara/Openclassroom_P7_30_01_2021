
// Authentification routes
const router = require('express').Router();
const { authJwt, checks } = require("./../middleware");
const controller = require("./../controllers/auth.controllers.js");
//----------------------------------------------------------------------------

router.post("/signin", checks.roles, checks.duplicateEmail, checks.email, checks.password, controller.signin );
router.delete("/signout/:userUuid", authJwt, controller.signout );
router.post("/login", checks.emailOrUsername, checks.password, controller.login)
router.put("/logout/:userUuid", authJwt, controller.logout) ;

module.exports = router ;