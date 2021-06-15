
// Authentification routes
const router = require('express').Router();
const { authJwt, checks } = require("./../middleware");
const controller = require("./../controllers/auth.controllers.js");
//----------------------------------------------------------------------------

router.post("/signin", checks.roles , checks.email, checks.password, controller.signin );
router.delete("/signout/:userUuid", authJwt, controller.signout );
router.put("/logout/:userUuid" , checks.password, controller.login) // TODO
router.post("/login", checks.emailOrUsername, checks.password, controller.login)
router.put("/updatepassword/:userUuid", authJwt, controller.updatePassword);

module.exports = router ;