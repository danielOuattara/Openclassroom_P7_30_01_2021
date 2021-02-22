/* Authentication:
--------------------

    POST /api/auth/signin
    POST /api/auth/login */

// const { verifySignUp } = require("../middleware");
// const controller = require("../controllers/userController");

// module.exports = function(app) {
//   app.use(function(req, res, next) {

//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.post("/api/auth/signin", [verifySignUp.checkDuplicateUser, verifySignUp. ], controller.signin );

//   app.post("/api/auth/login", controller.login);
// };


// =========================================================



const express    = require('express');
const router     = express.Router();
const checkRoles = require('./../middleware/checkRoles')
// const checkDuplicate = require('./../middleware/checkDuplicates.js')
const userController = require("../controllers/userController");


router.post('/signin', /* checkDuplicate, */ checkRoles, userController.signin );
router.post('/login' ,                             userController.login  );

module.exports = router;