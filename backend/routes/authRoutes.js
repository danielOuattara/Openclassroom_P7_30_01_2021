
/* Authorization:
------------------

    GET /api/test/all
    GET /api/test/user for logged-in users (user/moderator/admin)
    GET /api/test/mod for moderator
    GET /api/test/admin for admin */


// const { authJwt } = require("../middleware");
// const controller = require("../controllers/authController");

// module.exports = function(app) {

//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.get("/api/test/all", controller.allAccess); /* ??? Privée ou Publique ou semi-privée ????*/

//   app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard );

// //   app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard );

//   app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard );
// };


// ===========================================================================================================


const express        = require('express');
const router         = express.Router();
const auth           = require('./../middleware/auth.js')
const authController = require("../controllers/authController");
const authAdmin      = require('./../middleware/authAdmin.js')


router.get('/all',                      authController.allAccess);
router.get('/user',  auth ,             authController.userBoard );
router.get('/admin', auth , authAdmin , authController.adminBoard )


module.exports = router;