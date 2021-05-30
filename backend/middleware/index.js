const authJwt = require("./authJwt.js");
const checks = require("./checks.user.js");
const checksComment = require("./checks.comment.js");
const multer = require("./multer.config.js");

module.exports = {
    multer,
    authJwt,
    checks,
};