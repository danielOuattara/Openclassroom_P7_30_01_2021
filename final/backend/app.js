require('dotenv').config();

const express     = require( 'express');  // import 'express'
const bodyParser  = require( 'body-parser');
const app         = express(); 
const path        = require('path');
const cors        = require('cors');
const helmet      = require('helmet')
const limiter     = require('express-rate-limit');

// // const {sequelize, Sequelize} = require('./models');
// const Role = require("./models").Role;

// const db = require("./models");  // !important
// // db.role = require("./models/role.js")(sequelize, Sequelize);
// // const Role = db.role;
// db.Role = require('./models/Role.js'); // ! important
// // const Role = db.Role; 


const { sequelize, Sequelize } = require('./models');

const db = require("./models");
db.role = require("./models/Role.js")(sequelize, Sequelize);
// db.Role = require('./models/Role.js'); !! 
// const Role = require("./models").Role;


app.use(helmet())
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(limiter ({
  windowMs: 5000,
  max: 200, 
  message: {code: 429, message: 'Too many connection; Try later !' }
}))


  db.sequelize.sync( )
.then(() => {
  console.log('Resync database');
  console.log('   ===  Connected to Groupomania !  === ')
});


app.get ('/', (req, res, next) => {
  res.json({ message: "Groupomania development server !" })
});

app.use('/images', express.static(path.join(__dirname, 'images')));

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet



