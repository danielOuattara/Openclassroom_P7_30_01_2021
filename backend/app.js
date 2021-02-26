
require('dotenv').config();

const express     = require( 'express');  // importe 'express'
const bodyParser  = require( 'body-parser');
const path        = require('path');
const app         = express(); //  cree une application express
const boardRoutes = require('./routes/boardRoutes.js')
const userRoutes  = require('./routes/userRoutes.js')
const authRoutes  = require('./routes/boardRoutes.js')
const photoRoutes  = require('./routes/photoRoutes.js')
const helmet      = require('helmet')
const cors        = require('cors');
const limiter     = require('express-rate-limit');
const {sequelize, Sequelize} = require('./models');

const db = require("./models");
db.role = require("./models/RoleModel.js")(sequelize, Sequelize);
db.Role = require('./models/RoleModel.js')
const Role = db.role;

// -----------------------------------------------------------------------------



// ----------------------------------------------------------------------------

app.use(helmet())
app.use(cors());


// const DATABASE = process.env.DATABASE;
// const PSW = process.env.PSW;
// const ADDRESS = process.env.ADDRESS


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


const main = async () => {
  try {
    await sequelize.sync({force:true});
    // await sequelize.authenticate(); 
    await Role.create({
      id: 1,
      name: "user"
    });
    await Role.create({
      id: 2,
      name: "admin"
    });
    // await sequelize.sync({force: true});
    console.log('=== Database Connected =========================');

  } catch (err) {
      console.log(err)
  }
} 
main();


// const initial = async () => {
//   try {
//     // await sequelize.sync({force:true});
//     // await sequelize.authenticate(); 
//     const roleUser = await Role.create({
//       id: 1,
//       name: "user"
//     });

//     const roleAdmin = await Role.create({
//       id: 2,
//       name: "admin"
//     });

//     return { roleUser, roleAdmin}
//     // await sequelize.sync({force: true});
//     // console.log('=== Database Connected on http://localhost <<< ---');

//   } catch (err) {
//       console.log(err)
//   }
// } 
// initial();


// db.sequelize.sync({force:true})
// .then( () => {
//   console.log('=== Database Connected on http://localhost <<< ---')
  
//    Role.create({
//     id: 1,
//     name: "user"
//   });

//    Role.create({
//     id: 2,
//     name: "admin"
//   });

// })
// .catch( (err) => console.log(err))

// // const main = async () => {
  
// //     await sequelize.sync(); 

// // } 
// // main();


//    async function initial() {

//     try {

//       await Role.create({
//         id: 1,
//         name: "user"
//       });
  
//       await Role.create({
//         id: 2,
//         name: "admin"
//       });




//     } catch(err){
//       console.log(err)
//     }



//   }
 
// initial();

























app.get ('/', (req, res, next) => {
  res.json({message: "Welcome to Tutorial Application !"})
});



app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet


app.use('/api/board'  , boardRoutes )
app.use('/api/auth'   , authRoutes )
app.use('/api/users'  , userRoutes )
app.use('/api/photos' , photoRoutes )