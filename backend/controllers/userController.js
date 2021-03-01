// const config = require("./../config/authConfig.js");
const config = require("./../config/authConfig.js");
const { User, Role } = require('./../models');
const { Op } = require('sequelize')
const jsonwebtoken = require("jsonwebtoken");
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

  User.findOne({
    where: { email: req.body.email }
  })
  .then( user => {
      if (!user) {
        return res.status(401).json( {error: ' Invalid Email or Password !'} )   
      }
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password ); 
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
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    }).catch(err => { res.status(400).send({ message: err.message }) });
  })
  .catch(err => { res.status(500).send({ message: err.message }) });
};

// --------------------------------------------------------------------------------------


exports.deleteUser = (req, res, next) => {  //  = delate my account, by Admin
  const uuid = req.params.uuid;
  const { email, password } = req.body;

  User.findOne( { where: { uuid, password, email }
  })
  .then( user => {
      if(!user) {
          return res.status(401).json( {error: " Email or Password unknown ! : Erreur 1" } )  
      }

      // if (!email) {
      //   return res.status(401).json( {error: " User unknown ! : Erreur 1" } ) 
      // }

      bcrypt.compare( req.body.password, user.password)
      .then(() => {
          if (user.uuid === uuid) {
              User.destroy({
                  where: { uuid}
              })
              .then(() => res.status(200).json({ message: "Account deleted !" }))
              .catch((err) => res.status(403).json({ err }));
          }
          
      })
      .catch( res.status(401).json( {error: ' Email or Password unknown !'} ) )
  })
  .catch( error => res.status(500).json( {message:"User not in DB"} ))  
}
  // -----------------------------------------------------------------------------------------

exports.deleteUser = (req, res, next) => {  //  = delate my account (by user himself )
  const uuid = req.params.uuid
  const { email, password } = req.body
  User.findOne( { where: { uuid}
  })
  .then(() => {
      User.destroy({
      where: { uuid}
   })
     .then(() => res.status(200).json({ message: "Account deleted !" }))
     .catch((err) => res.status(403).json({ err }));       
})
  .catch((err) => res.status(403).json({ message: "ERREUR sur User" }));
}


// exports.deleteUser = (req, res, next) => {  //  = delate my account (by user himself )
//   const uuid = req.params.uuid
//   const { email, password } = req.body
//   User.findOne( { where: { uuid: user.uuid}
//   })
//   .then(() => {
//       User.destroy({
//       where: { id: req.params.id}
//    })
//      .then(() => res.status(200).json({ message: "Account deleted !" }))
//      .catch((err) => res.status(403).json({ err }));       
// })
//   .catch((err) => res.status(403).json({ message: "ERREUR sur User" }));
// }


// ----------------------------------------------------------------------------------------------------

exports.getOneUser = (req, res, next) => {
    const uuid = req.params.uuid;
    User.findOne( {
      where: {uuid}
    })
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


// exports.updateUser = (req, res, next) => {

//     const uuid = req.params.uuid;
//     const userObject = req.file ?
//         {
//           ...JSON.parse(req.body.user),  //si update d'image
//           imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//         }
//         :
//         {
//           ...req.body // sinon
//         }

//     // do not trust user input, even on update !
//     const regex =  /[\[\]<>=0]+/gi;

//     if ( regex.test(userObject.firstName)  || 
//          regex.test(userObject.lastName)   ||
//          regex.test(userObject.userName)   ||
//          regex.test(userObject.email)      ||
//          regex.test(userObject.gender)     ||
//          regex.test(userObject.age)        ||
//          regex.test(userObject.department) ||
//          regex.test(userObject.avatar)     ||
//          regex.test(userObject.aboutMe)   ) {
//       return res.status(401).json( { error: ' Fill in text Invalid !'  });
//     }

//     if (req.file) {

//         User.findByPk(id)
//         .then( photo => {
//             const filename = photo.imageUrl.split('/images/')[1];
//             fs.unlink( `images/${filename}`, () => {

//                 User.update({...userObject})
//                 .then( num => {
//                   if (num == 1) {
//                       res.send( {message: `Tutorial was updated succesfully !` })
//                   } else {
//                       res.send({ message: `Cannot update : Tutorial not found OR Request body is empty!`})
//                   }
//               })
//                 .catch( error =>  res.status(400).json({error}))
//             })
//               })
//         .catch( error => res.status(500).json({error}))

//     } else {

//         User.findByPk(id)
//         .then(user => {
//           Photo.update(req.body, { where: {id}})
//           .then( num => {
//             if (num == 1) {
//                 res.send( {message: `Tutorial was updated succesfully !` })
//             } else {
//                 res.send({ message: `Cannot update: Tutorial not found OR Request body is empty!`})
//             }
//           })
//           .catch( error =>  res.status(400).json({error}))
//         })
//     }
//   }


  // exports.updateUser = async (req, res,next) => {
  //   const  uuid = req.params.uuid
  //   const {firstName, lastName, email, age} = req.body
  
  //   try {
  //     const user = await User.findONe( { where: { uuid } })
  //     user.firstName = firstName;
  //     user.lastName = lastName;
  //     user.email = email;
  //     user.age = age;
  //     return res.status(200).json({message:"USer Succesfully Deleted !"})
  
  //   } catch(err) {
  
  //   }
  
  // }


// -----------------------------------------------------------------------------------------

exports.deleteUser = (req, res, next) => {  // Delete one accont, by Admin

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


// exports.deleteUser = (req, res, next) => {

//     User.findByPk(req.body)
//     .then( user => {
//         const filename = user.imageUrl.split('/images/')[1];

//         // regaer
//         fs.unlink( `images/${filename}`, () => {
//             User.destroy(  {
//               where: { _id: req.params.id } 
//             })
//             .then( ()     => res.status(200).json( { message: 'User deleted succesfully !'}) )
//             .catch( error => {console.log(error); res.status(400).json({error}) })
//             })
//     })
//     .catch( error => res.status(500).json({error}) )

// }


// exports.deleteUser = async (req, res,next) =>{
//   const  uuid = req.params.uuid

//   try {
//     await User.findONe( { where: { uuid } })
//     await User.destroy()
//     return res.status(200).json({message:"USer Succesfully Deleted !"})

//   } catch(err) {

//   }

// }


// -----------------------------------------------------------------------------------------


exports.signout = (req, res, next) => {  // delete my account (me or Admin)

  /*
  Can be called bu user Only
  Both images posted and corresponding comments, likes, dislakes are also deleted
  */

   User.findOne( {
      where: { email: req.body.email }
  })
  .then( user => {
      if(!user) {
          return res.status(401).json( {error: " user unknown !" } )  
      }

      bcrypt.compare( req.body.password, user.password)
      .then(() => {
          if (uuid === req.params.uuid /* || user is admin (how to ?) */) {
              User.destroy({
                  where: { uuid: req.params.uuid}
              })
              .then(() => res.status(200).json({ message: "Account deleted !" }))
              .catch((err) => res.status(403).json({ err }));
          }
          
      })
      .catch( res.status(401).json( {error: ' error 2  !'} ) )
  })
  .catch( error => res.status(500).json( {error} ))  
}
