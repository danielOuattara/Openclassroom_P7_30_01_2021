const db = require("./../models");
const config = require("./../config/authConfig.js");
const { User, Role } = require('./../models');
const jsonwebtoken = require('jsonwebtoken');

// const Role = db.role;

const Op = db.Sequelize.Op;

const bcrypt = require("bcryptjs");

const fs = require('fs')


// --------------------------------------------------------------------------------------

exports.signin = (req, res, next) => {
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
              .then(() =>  res.status(201).json({ message: "User was registered successfully!" }) );
          })
          .catch( error =>  res.status(400).json( {error}) );

        } else {
          // user role = 1
          user.setRoles([1])
          .then( () =>  res.status(201).json({ message: "User was registered successfully!" }) ) 
          .catch( error =>  res.status(400).json( {error}) )
        }
    })
    .catch(err => { res.status(500).send({ message: err.message }) });
};


// ----------------------------------------------------------------------------------------

exports.login = (req, res, next) => {

  console.log('#===========================================================================================================================================')
  // console.log(req)
  // console.log(req.body.email)
  // console.log(req.body.password)
  console.log('#===========================================================================================================================================')

  User.findOne({
    where: { email: req.body.email }
  })
  .then( user => {
    
      if (!user) {
        return res.status(401).json( {error: ' Invalid Email or Password !'} )    // Password Not Recognized
      }

      const passwordIsValid = bcrypt.compare(req.body.password, user.password );  // change her compareSync() to compare()  <------
      if (!passwordIsValid) {
        return res.status(401).json({error: "Invalid Email or Password !"})
      }

       const token = jsonwebtoken.sign(
          { id: user.id }, 
          config.secret, 
          {  expiresIn: 86400}
       );

    const authorities = [];
    user.getRoles()
    .then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res.status(200).json({
        // id: user.id,
        uuid: user.uuid,
        // username: user.username,
        // email: user.email,
        roles: authorities,
        accessToken: token
      });
    }).catch(err => { res.status(400).send({ message: err.message }) });
  })
  .catch(err => { res.status(500).send({ message: err.message }) });
};


// --------------------------------------------------------------------------------------


// exports.signout = (req, res, next) => {

//   console.log("===================================================================")
//   console.log(req.body.email)
//   console.log(req.body.password)
//   console.log("---------------------")
//   console.log(user.password)
//   console.log(req.params.id)
//   console.log("====================================================================")

//   User.findOne( {
//       where: { email: req.body.email }
//   })

//   .then( user => {
//       if(!user) {
//           return res.status(401).json( {error: " Email or Password unknown !" } )  
//       }

//       bcrypt.compare( req.body.password, user.password)
//       .then(() => {
//           if (user.id === req.params.id) {
//               User.destroy({
//                   where: { id: req.params.id}
//               })
//               .then(() => res.status(200).json({ message: "Account deleted !" }))
//               .catch((err) => res.status(403).json({ err }));
//           }
          
//       })
//       .catch( res.status(401).json( {error: ' Email or Password unknown !'} ) )
//   })
//   .catch( error => res.status(500).json( {error} ))  
// }


// ----------------------------------------------------------------------------------------------------


exports.getOneUser = (req, res, next) => {
    const id = req.params.id;
    User.findByPk(id)
    .then( user  => res.status(200).json(user))
    .catch( err => res.status(500).send( { message: err.message || `Error while retrieving Tutorial id = ${id}`} ))
  };


// ------------------------------------------------------------------------------------------------------


exports.getAllUsers = (req, res, next) => {

  User.findAll()
  .then( users => res.status(200).json(users))
  .catch( error => res.status(400).json( {error} ));
  }


// -------------------------------------------------------------------------------------------------------


exports.updateUser = (req, res, next) => {

    const id = req.params.id;
    const userObject = req.file ?
        {
          ...JSON.parse(req.body.user),  //si update d'image
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        :
        {
          ...req.body // sinon
        }

    // do not trust user input, even on update !
    const regex =  /[\[\]<>=0]+/gi;

    if ( regex.test(userObject.firstName)  || 
         regex.test(userObject.lastName)   ||
         regex.test(userObject.userName)   ||
         regex.test(userObject.email)      ||
         regex.test(userObject.gender)     ||
         regex.test(userObject.age)        ||
         regex.test(userObject.department) ||
         regex.test(userObject.avatar)     ||
         regex.test(userObject.aboutMe)   ) {
      return res.status(401).json( { error: ' Fill in text Invalid !'  });
    }

    if (req.file) {

        User.findByPk(id)
        .then( photo => {
            const filename = photo.imageUrl.split('/images/')[1];
            fs.unlink( `images/${filename}`, () => {

                User.update({...userObject})
                .then( num => {
                  if (num == 1) {
                      res.send( {message: `Tutorial was updated succesfully !` })
                  } else {
                      res.send({ message: `Cannot update Tutorial with id=${id} : Tutorial not found OR Request body is empty!`})
                  }
              })
                .catch( error =>  res.status(400).json({error}))
            })
              })
        .catch( error => res.status(500).json({error}))

    } else {

        Photo.findByPk(id)
        .then(photo => {
          Photo.update(req.body, { where: {id}})
          .then( num => {
            if (num == 1) {
                res.send( {message: `Tutorial was updated succesfully !` })
            } else {
                res.send({ message: `Cannot update Tutorial with id=${id} : Tutorial not found OR Request body is empty!`})
            }
          })
          .catch( error =>  res.status(400).json({error}))
        })
    }
  }


// -----------------------------------------------------------------------------------------

exports.deleteUser = (req, res, next) => {

    User.findByPk(id)
    .then( user => {
        const filename = user.imageUrl.split('/images/')[1];

        // regaer
        fs.unlink( `images/${filename}`, () => {
            User.destroy(  {
              where: { _id: req.params.id } 
            })
            .then( ()     => res.status(200).json( { message: 'User deleted succesfully !'}) )
            .catch( error => {console.log(error); res.status(400).json({error}) })
            })
    })
    .catch( error => res.status(500).json({error}) )

}

// -----------------------------------------------------------------------------------------


exports.signout = (req, res, next) => {  // delete my account

  console.log("===================================================================")
  console.log(req.body.email)
  console.log(req.body.password)
  console.log("---------------------")
  console.log(user.password)
  console.log(req.params.id)
  console.log("====================================================================")

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
