
const db = require("./../models");
const ROLES = db.ROLES;


module.exports = (req, res, next) => {

    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          return res.status(400).send({  message: "Failed! Role does not exist = " + req.body.roles[i] });
        }
      }
    }
    next();
  };
  

  