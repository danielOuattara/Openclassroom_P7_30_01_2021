const db = require("./../models");
const config = require("./../config/authConfig.js");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// --------------------------------------------------------------------------------------

exports.signin = (req, res) => {

  // Save User to Database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)  // change her hashSync() to hash()  <------
  })
  .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: { [Op.or]: req.body.roles }
          }
        })
        .then(roles => {
            user.setRoles(roles)
            .then(() => { res.send({ message: "User was registered successfully!" }) });
        })
        .catch( error =>  res.status(400).json( {error}) );

      } else {
        // user role = 1
        user.setRoles([1])
        .then(() => { res.send({ message: "User was registered successfully!" }) })
        .catch( error =>  res.status(400).json( {error}) )
      }
  })
  .catch(err => { res.status(500).send({ message: err.message }) });
};

// ----------------------------------------------------------------------------------------


exports.login = (req, res, next) => {

  User.findOne({
    where: { email: req.body.email }
  })
  .then( user => {

      if (!user) {
        return res.status(401).json( {error: ' Email or Password unknown !'} )    // Password Not Recognized
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password );  // change her compareSync() to compare()  <------

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    const authorities = [];
    user.getRoles()
    .then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user.id,
        // username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    }).catch(err => { res.status(400).send({ message: err.message }) });
  })
  .catch(err => { res.status(500).send({ message: err.message }) });
};


// --------------------------------------------------------------------------------------


exports.signout = (req, res, next) => {

  User.findOne( {
      where: { email: req.body.email }
  })

  .then( user => {
      if(!user) {
          return res.status(401).json( {error: " Email or Password unknown !" } )  
      }

      bcrypt.compare( req.body.password, user.password)
      .then(() => {
          if (user.id === req.params.id) {
              User.destroy({
                  where: { id: req.params.id}
              })
              .then(() => res.status(200).json({ message: "Account deleted !" }))
              .catch((err) => res.status(403).json({ err }));
          }
          
      })
      .catch( res.status(401).json( {error: ' Email or Password unknown !'} ) )
  })
  .catch( error => res.status(500).json( {error} ))  
}