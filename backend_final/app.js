require('dotenv').config();

const express     = require( 'express');  // importe 'express'
const bodyParser  = require( 'body-parser');
const cors        = require('cors');
const app         = express(); //  cree une application express


app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


const db= require("./models/");
const Role =  db.role;

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
  res.json({ message: "Node.js Demo for JWT Authentication" })
});


// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet



