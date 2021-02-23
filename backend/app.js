
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
const db = require("./models");
const Role = db.role;

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



db.sequelize.sync();

Role.create({
  id: 1,
  name: "user"
});


Role.create({
  id: 2,
  name: "admin"
});


app.get ('/', (req, res, next) => {
  res.json({message: "Welcome to Tutorial Application !"})
});



app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet


app.use('/api/board'  , boardRoutes )
app.use('/api/auth'   , authRoutes )
app.use('/api/users'  , userRoutes )
app.use('/api/photos' , photoRoutes )