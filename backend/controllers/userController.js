// const config = require("./../config/authConfig.js");
const bcrypt = require("bcryptjs");
const config = require("./../config/authConfig.js");
const { User, Role, Photo } = require('./../models');
const { Op } = require('sequelize')
const jsonwebtoken = require("jsonwebtoken");
const validator = require('email-validator')

const fs = require('fs')


// --------------------------------------------------------------------------------------

exports.signin = (req, res) => {

    bcrypt.hash(req.body.password, 11)
    .then( hash => {
        User.create( {        
          email: req.body.email,
          password: hash
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
                .then(() =>  res.status(201).json({ message: "User was registered successfully!" }) )
                .catch( error =>  res.status(400).json( {error}) )
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
    
    })
    .catch(error => res.status(500).json( {error}))
}

// ----------------------------------------------------------------------------------------

exports.login = (req, res) => {

  if (!validator.validate(req.body.email)) {
    return res.status(401).json({error:" Invalid Email or Password !" } )
  }
  User.findOne({ where: { email: req.body.email } })
  .then( user => {

      if (!user) {
        return res.status(401).json( {error: ' Invalid Email or Password !'} )   
      }

      bcrypt.compare( req.body.password, user.password)
      .then( valid => {
        if(valid) {
          const authorities = [];
          user.getRoles()
          .then(roles => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).json({
              user,
              roles: authorities,
              accessToken : jsonwebtoken.sign(
                { userUuid: user.uuid,
                  userRole: [...authorities]
                }, 
                config.secret, 
                {  expiresIn: 43200}),
            });
          }).catch(err => { res.status(400).send({ message: err.message }) });
        } else {
        return res.status(401).json( {error: ' Invalid Email or Password !'} )    // Password Not Recognized
    }
      })
      .catch(err => { res.status(400).send({ error: ' Invalid Email or Password !'}) })
  })
  .catch(err => { res.status(500).send({ message: err.message }) });
}

// ----------------------------------------------------------------------------------------------------------------


exports.signout = (req, res, next) => { 
  const { email, password } = req.body;
  User.findOne({ where: { email } })
  .then( user => {
      if(!user) {
          return res.status(401).json( {error: " Email or Password Invalid ! 1" } )  
      }

      bcrypt.compare( password, user.password)
      .then( valid => {
          if (valid) {
              user.destroy()
              .then(() => res.status(200).json({ message: "Account deleted !" }))
              .catch((err) => res.status(403).json({ err }));
          } else {
               return res.status(401).json( {error: " Email or Password Invalid ! 2" } )
          }
      })
      .catch( error => res.status(500).json( {eeror: error.message} )) 
  })
  .catch( error => res.status(500).json( {eeror: error.message} )) 
}

// ----------------------------------------------------------------------------------------


exports.adminDeleted = (req, res, next) => {  // by Admin
  const {uuid } = req.body;

  User.findOne({ where: { uuid } })
  .then( user => {
      if(!user) {
          return res.status(401).json( {error: " User Unknown !" } )  
      }

      User.destroy({ where: { uuid } })
      .then(() => res.status(200).json({ message: "Account deleted !" }))
      .catch((err) => res.status(403).json({ err }))
    })
  .catch( error => res.status(500).json( {eeror: error.message} )) 

  };

  // ----------------------------------------------------------------------------------------------------

exports.getOneUser = (req, res, next) => {
    const uuid = req.params.uuid;
    User.findOne( { where: {uuid}  })
    .then( user => res.status(200).json(user))
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

    const uuid = req.params.uuid;
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
      return res.status(401).json( { error: ' Filled in text is Invalid !'  });
    }

    if (req.file) {

      User.findOne({ where: {uuid } })
      .then( photo => {
          const filename = photo.imageUrl.split('/images/')[1];
          fs.unlink( `images/${filename}`, () => {

              User.update({...userObject})
              .then( num => {
                if (num == 1) {
                    res.send( {message: `Tutorial was updated succesfully !` })
                } else {
                    res.send({ message: `Cannot update : Tutorial not found OR Request body is empty!`})
                }
            })
              .catch( error =>  res.status(400).json({error}))
          })
            })
      .catch( error => res.status(500).json({error}))

    } else {

      User.findOne({ where: {uuid } })
      .then(user => {
        Photo.update(req.body, { where: {id}})
        .then( num => {
          if (num == 1) {
              res.send( {message: `User profil was updated succesfully !` })
          } else {
              res.send({ message: `Cannot update: user not found OR Request body is empty!`})
          }
        })
        .catch( error =>  res.status(400).json({error}))
      })
      .catch( error =>  res.status(500).json({error}))
    }
  }


  // exports.updateUser = async (req, res,next) => {
  //   const  uuid = req.params.uuid
  //   const {firstName, lastName, email, age} = req.body
  
  //   try {
  //     const user = await User.findONe( { where: { uuid } })
  //     user.firstName = firstName;
  //     user.lastName = lastName;
  //     user.email = email;
  //     user.age = age;
  //     return res.status(200).json({message:"USer Succesfully Updated !"})
  
  //   } catch(err) {

  //   }
  // }


// -----------------------------------------------------------------------------------------


