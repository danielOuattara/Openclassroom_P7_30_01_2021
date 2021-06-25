
// ADMIN ROUTES

const router = require('express').Router();
const { authJwt} = require("./../middleware");
const controller = require("./../controllers/admin.controllers");

/* Reports  
--------------- */
router.get("/reports/photos", authJwt, controller.getPhotoReports); 
router.get("/reports/photos/comments", authJwt, controller.getPhotoCommentReports); 
router.put("/reports/photos/:photoUuid", authJwt, controller.updatePhotoReportStatus); 
router.put("/reports/photos/:photoUuid/comments/commentUuid", authJwt, controller.updatePhotoCommentReportStatus); 

module.exports = router ;