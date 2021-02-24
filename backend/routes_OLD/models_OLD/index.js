
//  Initialize Sequelize : coonection & tables creation
//----------------------

const Sequelize = require("sequelize");
const config = require("./../config/dbConfig.js");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

// test DB
// -----------------------
sequelize.authenticate()
.then( ()=> console.log("==========  **** Database Conected !  **** ============"))
.catch( err => console.log(err));



const db = {};



db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user    = require("./userModel.js")(sequelize, Sequelize);
db.role    = require("./roleModel.js")(sequelize, Sequelize);
db.photo   = require('./photoModel.js')(sequelize, Sequelize);
db.commentPhoto = require('./commentPhotoModel.js')(sequelize, Sequelize)
db.usersLikesPhoto = require('./usersLikesPhoto.js')(sequelize, Sequelize);



// ----------------------------------------------------------------------------

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin"];

// ----------------------------------------------------------------------------

db.user.hasMany(db.photo, {as: "photos"});
db.photo.belongsTo(db.user, {
  foreignKey:"userId",
  as: "user",
});

// ----------------------------------------------------------------------------

db.photo.belongsToMany(db.commentPhoto, {
  through: "comment_photo",
  as: "commentsPhoto",
  foreignKey: "photo_id",
});

db.commentPhoto.belongsToMany(db.photo, {
  through: "comment_photo",
  as: "photos",
  foreignKey: "commentPhoto_id",
});


// ----------------------------------------------------------------------------



db.photo.belongsToMany(db.usersLikesPhoto, {
  through: "usersLikesPhoto_photo",
  as: "userLikesPhoto",
  foreignKey: "photo_id",
});


db.usersLikesPhoto.belongsToMany(db.photo, {
  through: "usersLikesPhoto_photo",
  as:"photos",
  foreignKey: "userLikesPhoto_id"
});
// ----------------------------------------------------------------------------

module.exports = db;
