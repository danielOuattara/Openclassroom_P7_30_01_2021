
require('dotenv').config();

const express     = require( 'express');  // importe 'express'
const bodyParser  = require( 'body-parser');
const app         = express(); //  cree une application express
const path        = require('path');

const authRoutes    = require('./routes/authRoutes.js')
const userRoutes    = require('./routes/userRoutes.js')
const photoRoutes   = require('./routes/photoRoutes.js')
// const commentRoutes = require('./routes/commentRoutes.js')
// const likeRoutes    = require('./routes/likeRoutes.js')

const helmet      = require('helmet')
const cors        = require('cors');
const limiter     = require('express-rate-limit');
const {sequelize, Sequelize, Role} = require('./models');

const db = require("./models");
db.role = require("./models/RoleModel.js")(sequelize, Sequelize);
db.Role = require('./models/RoleModel.js')


app.use(helmet())
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());

app.use(limiter ({
  windowMs: 5000,
  max: 200, 
  message: {code: 429, message: 'Too many connection; Try later !' }
}))



//  --------------------------------------------------------------


const main = async (req, res, next) => {

  try {
    await db.sequelize.sync();
    console.log('   ================   Connected to groupomania_db !  ========================  ')
  } catch (err) {

    console.log(err)
    return res.status(400).json(err)
  }

  // adminRole();
  // userRole();
}

// const adminRole = async (req, res, next) => {

//   try {
//     await Role.create({ id: 1, name: "user" });
//   } catch (err) {

//     console.log(err)
//     return res.status(400).json(err)
//   }
// }


// const userRole = async (req, res, next) => {

//   try {
//     await Role.create({ id: 2, name: "admin" });
//   } catch (err) {

//     console.log(err)
//     return res.status(400).json(err)
//   }
// }


main()


app.get ('/', (req, res, next) => {
  res.json({message: "Welcome Groupomania's Social Application !"})
});


app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet

app.use('/api/users'       , userRoutes )
app.use('/api/auth'        , authRoutes )
app.use('/api/photos'      , photoRoutes )
// app.use('/api/comments' , commentRoutes )
// app.use('/api/likes'    , likeRoutes )