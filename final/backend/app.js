require('dotenv').config();

const express     = require( 'express');  // import 'express'
const bodyParser  = require( 'body-parser');
const app         = express(); 
const path        = require('path');
const cors        = require('cors');
const helmet      = require('helmet')
const limiter     = require('express-rate-limit');

const { sequelize, Sequelize } = require('./models');
const db = require("./models");
db.role = require("./models/Role.js")(sequelize, Sequelize);

const authRoutes    = require('./routes/auth.routes.js')
const userRoutes    = require('./routes/user.routes.js')
const photoRoutes   = require('./routes/photo.routes.js')

app.use(helmet())
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, x-acces-token');
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

// ----------------------------------------------------------------------
db.sequelize.sync(/* {force:true} */ )
.then(() => {
  console.log('Resync database : success !');
  console.log('   ===  Connected to Groupomania !  === ')
})
.catch( err=> res.status(500).send( {message: err.message}));
// -----------------------------------------------------------------------

app.get ('/', (req, res, next) => {
  res.json({ message: "Groupomania development server !" })
});

app.use('/images', express.static(path.join(__dirname, 'images')));

// routes
// require('./routes/auth.routes')(app);
// require('./routes/user.routes')(app);
// require('./routes/photo.routes')(app);

app.use('/api/auth'  , authRoutes )
app.use('/api/users' , userRoutes )
app.use('/api/tests' , userRoutes )
app.use('/api/photos', photoRoutes)

module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet



