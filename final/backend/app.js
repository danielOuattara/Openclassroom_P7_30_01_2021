require('dotenv').config();

const express     = require( 'express');  // import 'express'
const bodyParser  = require( 'body-parser');
const helmet      = require('helmet')
const cors        = require('cors');
const limiter     = require('express-rate-limit');
const app         = express(); 


app.use(helmet())
app.use(cors());

const {sequelize, Sequelize} = require('./models');

const db = require("./models");
db.role = require("./models/role.model.js")(sequelize, Sequelize);
const Role =  db.role;
db.Role = require('./models/role.model.js');

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


db.sequelize.sync(/* {force:'true'} */)
.then(() => {
  console.log('Resync database');
  // initial();
});


function initial() {
  Role.create({
    id: 1,
    name:"user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}


app.get ('/', (req, res, next) => {
  res.json({ message: "Groupomania development server !" })
});


// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet



