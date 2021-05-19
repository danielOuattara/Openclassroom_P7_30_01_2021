
const config = require("./../config/auth.config.js");
const db = require("./../models");
const { User } = require('./../models');
// const { Op } = require('sequelize')
const Op = db.Sequelize.Op;
const model = require("./../models");
const fs = require("fs");

// --------------------------------------------------------------------------

exports.userBoard = (req, res) =>  {
  return res.status(200).send("User Content !"); 
};

// ---------------------------------------------------------------------------------------------------------------

exports.adminBoard = (req, res) =>  {
   return res.status(200).send("Admin Content !");  
}
// ---------------------------------------------------------------------------------------------------------------

exports.getOneUser = (req, res) => {
    User.findOne( { 
      where: {uuid : req.params.userUuid},
      include: ['photos', 'comments', 'likes']
    })
    .then( user  => {
      return res.status(200).json(user)
    })
    .catch( err => res.status(500).json( { message: err.message || `Error while retrieving user`} )) 
  };

// ---------------------------------------------------------------------------------------------------------------

exports.getAllUsers = (req, res) => {
  User.findAll( {
    include: ['photos', 'comments', 'likes'],
  })
  .then( users => res.status(200).json(users))
  .catch( error => res.status(400).json( {error: error.message} ));
}

// ---------------------------------------------------------------------------------------------------------------

exports.updateUser =  async (req, res) => {
  try {
      // const userObject = req.file ? 
      //     ( req.body.user ? 
      //         {  
      //           ...JSON.parse(req.body.user),
      //           avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
      //         }
      //         : 
      //         {
      //           avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
      //         }
      //     )
      //     :   
      //     {...req.body } 

//--------------------------------------------------------------------------------------------------
      const textOnly = {...req.body};
      const avatarOnly = { avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}` };
      const fullData =  {  
          ...JSON.parse(req.body.user),
          avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
       };
      const userObject = req.file ? ( req.body.user ? fullData: avatarOnly ) : textOnly;






      console.log( "userObject = ",  userObject)
      if (!userObject) {
        return res.status(400).json({Error: "No Data provided for update, try again !"})
      }

      const user = await User.findOne( { where: { uuid: req.params.userUuid }} );

      if(req.file) {

          if(!user.avatar) {
              await user.update( userObject)
              res.status(201).json( "User data & photo successfully updated ! ")
          
          } else if (!req.body.user) {
              const filename = user.avatar.split('/avatars/')[1];
              fs.unlink(`images/avatars/${filename}`, (err) => {
                if(err) throw err;
              })
              await user.update( userObject)
              res.status(201).json( "Photo successfully updated ! ")
          
          } else {
              const filename = user.avatar.split('/avatars/')[1];
              fs.unlink(`images/avatars/${filename}`, (err) => {
                if(err) throw err;
              })
              await user.update(userObject)
                  res.status(201).json( "User data & photo successfully updated ! ")
          }
      } else {
          await user.update(userObject)
          return res.status(201).json( "User data successfully updated ! ");
      }
  } catch(err) {
    return res.status(400).json({ Error: err.message})
  }
}


// exports.updateUser = (req, res) => {
//   const userObject = req.file ? 
//   {
//     ...JSON.parse(req.body.user),
//     avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}` 
//   }
//   :   
//   {...req.body }  

//   User.findOne({ where: { uuid: req.params.userUuid } })
//   .then( user => {
//     if(!user) return res.status(400).json( {Error: "User unknown !" } )

//     if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
//       return res.status(403).json( {error: "Acces Denied !" } )  
//     }

//     if(req.file) {
//         if(!user.avatar) {
//             User.update( userObject, { where: { uuid: req.params.userUuid } } )
//             .then( num => {
//                 console.log("num ==== ", num)
//                 if (num == 1) {
//                   res.status(201).json( "User data & photo successfully updated ! ")
//                 } 
//             })
//             .catch( err => res.status(500).json( {message: err.message || "ERROR: Update Failed"} )) 

//         } else {
//             const filename = user.avatar.split('/avatars/')[1];
//             fs.unlink( `images/avatars/${filename}`, () => {
//               User.update( userObject, { where: { uuid: req.params.userUuid } } )
//               .then( num => {
//                 console.log("num ==== ", num)
//                 if (num == 1) {
//                   res.status(201).json( "User data & photo successfully updated ! ")
//                 } 
//               })
//               .catch( err => res.status(500).json( {message: err.message || "ERROR: Update Failed"} )) 
//             })
//         } 
//     } else {
//       user.update( userObject)
//       .then( () => res.status(201).json( "User data successfully updated ! "))
//       .catch( error => res.status(500).json( {error: error.message} )) 
//       }
//   })
//   .catch(err => res.status(500).json({err: err.message})) 
// }
  
  // ---------------------------------------------------------------------------------------------------------------