
const { User, Photo, Like, Comment } = require('./../models');
const fs = require("fs");

// -------------------------------------------------------------------------------------------------------------

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
      include: [ 
        {
          model: Photo,
          as: 'photos',
          include: [
            { model: Like, as:'likes'}, 
            { model: Comment, as:'comments'},
          ],
          order: [
            ['createdAt', 'DESC']
          ],
        },
        {
          model: Like,
          as: 'likes',
          include: [{ model: Photo, as:'photo' } ],
        },
        {
          model: Comment,
          as: 'comments',
          include: [{ model: Photo, as:'photo' } ],
          order: [
            ['createdAt', 'ASC']
          ],
        }
      ]
    })
    .then( user  => {
      if (!user) {
         return res.status(404).json("User unknown !");
      }
      return res.status(200).json(user);
    })
    .catch( err => res.status(500).json( { message: err.message || `Error while retrieving user`} )) 
  };

// ---------------------------------------------------------------------------------------------------------------

exports.getAllUsers = (req, res) => {
  User.findAll( {
      order: [
        ['firstName', 'DESC']
      ],
      include: [ 
        {
          model: Photo,
          as: 'photos',
          order: [
            ['createdAt', 'DESC']
          ],
          include: [
            { model: Like, as:'likes'}, 
            { 
              model: Comment, 
              as:'comments',
              order: [ ['createdAt', 'DESC']
            ],
              include:[
                {
                  model: User,
                  as:'owner'
                }
              ]
            },
          ]
        }, 
      ],
  })
  .then( users =>  {
    if (!users) {
      return res.status(404).json("No User Found !");
    }
    res.status(200).json(users)
  })
  .catch( error => res.status(400).json( {error: error.message} ));
}

// ---------------------------------------------------------------------------------------------------------------

exports.updateUser =  async (req, res) => { 
  console.log ("req ===>--->",req)
    try {
        const userObject = 
          req.file ? 
              req.body ?  
                  {...req.body, avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}` }  
                  :  
                  { avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}` } 
          :  
          {...req.body } 
        
          console.log(" userObject ==> ", userObject); // TO DELETE

        const user = await User.findOne( { where: { uuid: req.params.userUuid }} );
        if (!user) {
            return res.status(404).send("User unknown !");
        }
        if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
              return res.status(403).send("Non Authorized !")  
        }

        if(req.file) {
            if (req.body && !user.avatar) {
                await user.update(userObject)
                res.status(201).json("New data & newly photo successfully updated !")  
            }  
            else if (req.body && user.avatar) {
                const filename = user.avatar.split('/avatars/')[1];
                console.log("------------->", filename);
                fs.unlink(`images/avatars/${filename}`, (err) => {
                  if(err) throw err;
                })
                await user.update( userObject)
                res.status(201).send("New data & Changed Photo successfully updated !")
            }

            else if (!req.body && !user.avatar) {
                await user.update( userObject)
                res.status(201).send(" Newly photo successfully updated !")
            } 

            else if (!req.body && user.avatar) {
                const filename = user.avatar.split('/avatars/')[1];
                fs.unlink(`images/avatars/${filename}`, (err) => {
                  if(err) throw err;
                })
                await user.update( userObject)
                res.status(201).send("Changed photo successfully updated !")
            } 
        } else {
            await user.update(userObject)
            return res.status(201).send("New data successfully updated !");
        }
  } catch(err) {
    return res.status(400).json({ Error: err.message})
  }
}
//-----------------------------------------------------------------------------------------------------

// exports.updateUser =  async (req, res) => { 
//     try {
//         const userObject = 
//           req.file ? 
//               req.body.user ?  
//                   {...JSON.parse(req.body.user), avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}` }  
//                   :  
//                   { avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}` } 
//           :  
//           {...req.body } 
        
//           console.log(userObject); // TO DELETE

//         const user = await User.findOne( { where: { uuid: req.params.userUuid }} );
//         if (!user) {
//             return res.status(404).send("User unknown !");
//         }
//         if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
//               return res.status(403).send("Non Authorized !")  
//         }

//         if(req.file) {
//             if (req.body.user && !user.avatar) {
//                 await user.update(userObject)
//                 res.status(201).json("New data & newly photo successfully updated !")  
//             }  
//             else if (req.body.user && user.avatar) {
//                 const filename = user.avatar.split('/avatars/')[1];
//                 // console.log("------------->", filename);
//                 fs.unlink(`images/avatars/${filename}`, (err) => {
//                   if(err) throw err;
//                 })
//                 await user.update( userObject)
//                 res.status(201).send("New data & Changed Photo successfully updated !")
//             }

//             else if (!req.body.user && !user.avatar) {
//                 // console.log( "userObject = " , userObject)
//                 await user.update( userObject)
//                 res.status(201).send(" Newly photo successfully updated !")
//             } 

//             else if (!req.body.user && user.avatar) {
//                 // console.log( "userObject = " , userObject)
//                 const filename = user.avatar.split('/avatars/')[1];
//                 fs.unlink(`images/avatars/${filename}`, (err) => {
//                   if(err) throw err;
//                 })
//                 await user.update( userObject)
//                 res.status(201).send("Changed photo successfully updated !")
//             } 
//         } else {
//             await user.update(userObject)
//             return res.status(201).send("New data successfully updated !");
//         }
//   } catch(err) {
//     return res.status(400).json({ Error: err.message})
//   }
// }
// //-----------------------------------------------------------------------------------------------------