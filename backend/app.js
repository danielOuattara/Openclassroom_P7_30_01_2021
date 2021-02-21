
require('dotenv').config();

const express     = require( 'express');  // importe 'express'
const bodyParser  = require( 'body-parser');
const path        = require('path');
// const sauceRoutes = require('./routes/photoRoutes.js')
// const userRoutes  = require('./routes/userRoutes.js')
const app         = express(); //  cree une application express
const helmet      = require('helmet')
const cors        = require('cors');
const limiter     = require('express-rate-limit');

// import {initial} from './config/initial.js'

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
  message: {
    code: 429,
    message: 'Too many connection; Try later !'
  }
}))

// const db = require('./models/');
// const Role = db.role;

// db.sequelize.sync({ force: true })
// .then(() =>  {
//   console.log("Drop and re-sync db.");
//   // initial();

//     Role.create({
//       id: 1,
//       name: "user"
//     });
   
//     Role.create({
//       id: 2,
//       name: "moderator"
//     });
   
//     Role.create({
//       id: 3,
//       name: "admin"
//     });
  
// })

app.get ('/', (req, res, next) => {
  res.json({message: "Welcome to Tutorial Application !"})
});

// app.use('/images', express.static(path.join(__dirname, 'images')));
// require('./routes/authRoute.js')(app);
// require('./routes/userRoutes.js')(app);
// // app.use('/api/photos', photoRoutes )  // OLD
// app.use('/api/auth'  , userRoutes  )      // OLD

module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet

