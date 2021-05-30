
const { User, Photo, Like, Comment } = require('./../models');
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
      include: [ 
        {
          model: Photo,
          as: 'photos',
          include: [
            { model: Like, as:'likes'}, 
            { model: Comment, as:'comments'},
          ]
        },
        {
          model: Like,
          as: 'likes',
          include: [{ model: Photo, as:'photo' } ]
        },
        {
          model: Comment,
          as: 'comments',
          include: [{ model: Photo, as:'photo' } ]
        }
      ]
    })
    .then( user  => {
      if (!user) {
         return res.status(404).json({ Error: "User unknown !"});
      }
      return res.status(200).json(user);
    })
    .catch( err => res.status(500).json( { message: err.message || `Error while retrieving user`} )) 
  };

// ---------------------------------------------------------------------------------------------------------------

exports.getAllUsers = (req, res) => {
  User.findAll( {
    // include: ['photos', 'comments', 'likes'],
      include: [ 
        {
          model: Photo,
          as: 'photos',
          include: [
            { model: Like, as:'likes'}, 
            { model: Comment, as:'comments'},
          ]
        }
      ]
  })
  .then( users => res.status(200).json(users))
  .catch( error => res.status(400).json( {error: error.message} ));
}

// ---------------------------------------------------------------------------------------------------------------

exports.updateUser =  async (req, res) => {
  try {

          // const userObject = req.file ? 
          // {
          //   ...JSON.parse(req.body.user),
          //   avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}` 
          // }
          // :   
          // {...req.body } 


      // const textOnly = {...req.body};
      // const fullData =  {  
      //     ...JSON.parse(req.body.user),
      //     avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
      //  };

      // const userObject = req.file ? fullData : textOnly;


      // const userObject = req.file ? 
      //     req.body.user ? 
      //         {  
      //           ...JSON.parse(req.body.user),
      //           avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
      //         }
      //         : 
      //         {
      //           avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
      //         }
      //     :   
      //     {...req.body } 
      
      //--------------------------------------------------------------------------------------------------


      console.log("req.file = ",  req.file)
      
      // const textOnly = {...req.body};
      // console.log( "textOnly = ", textOnly);
      
      // const avatarOnly = { avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}` };
      // console.log( "avatarOnly = ", avatarOnly);
      
      // const fullData =  {  
      //   ...JSON.parse(req.body.user),
      //   avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
      // };
      // console.log( "fullData = ", fullData);

      // const userObject = req.file ? req.body.user ? fullData: avatarOnly : textOnly;

      // console.log( "userObject = ",  userObject);

      // if (req.body === null ) {
      //   return res.status(400).json({Error: "No Data provided for update, try again !"})
      // }

      // let userObject;
      // if (req.file && req.body.user) {
      //     userObject = 
      //       {  ...JSON.parse(req.body.user),
      //           avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
      //       };
      // }

      // if (req.file && !req.body.user) {
      //   userObject = {avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}` }
      // }
      // if (!req.file && !req.body.user) {
      //   userObject = {...req.body }
      // }


      // console.log("req.file = ",  req.file)
      
      // const textOnly = {...req.body};
      // console.log( "textOnly = ", textOnly);
      
      // const avatarOnly = { avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}` };
      // console.log( "avatarOnly = ", avatarOnly);
      
      // const fullData =  {  
      //   ...JSON.parse(req.body.user),
      //   avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
      // };
      // console.log( "fullData = ", fullData);

      // const userObject = req.file ? req.body.user ? fullData: avatarOnly : textOnly;

      // console.log( "userObject = ",  userObject);
      console.log( "userObject = ",  userObject);

      // if ( Object.entries(userObject).length === 0 && userObject.constructor === Object) {
      //     return res.status(400).json({Error: "Nothing provided. Nothing to update. Try again !"})
      // }
      const user = await User.findOne( { where: { uuid: req.params.userUuid }} );
      if (!user) {
          return res.status(404).json({ Error: "User unknown !"});
      }

      if(req.file) {

          if(req.body.user && !user.avatar) {
              console.log( "userObject = " , userObject)
              await user.update( userObject)
              res.status(201).json("New data & newly photo successfully updated !")  
          }  
          
          if (req.body.user && user.avatar) {
              console.log( "userObject = " , userObject)
              const filename = user.avatar.split('/avatars/')[1];
              fs.unlink(`images/avatars/${filename}`, (err) => {
                if(err) throw err;
              })
              await user.update( userObject)
              res.status(201).json("New data & Changed Photo successfully updated !")
          }
          
          if (!req.body.user && !user.avatar) {
            console.log( "userObject = " , userObject)
            await user.update( userObject)
            res.status(201).json(" Newly photo successfully updated !")
          } 
          
          if (!req.body.user && user.avatar) {
              console.log( "userObject = " , userObject)
              const filename = user.avatar.split('/avatars/')[1];
              fs.unlink(`images/avatars/${filename}`, (err) => {
                if(err) throw err;
              })
              await user.update( userObject)
              res.status(201).json("Changed photo successfully updated !")
          } 

      } else {
          await user.update(userObject)
          return res.status(201).json("New data successfully updated !");
      }


      // if(req.file) {

      //     if(!user.avatar) {
      //         await user.update( userObject)
      //         res.status(201).json( "User data & photo successfully updated ! ")
          

      //     } else if (!req.body.user) {
      //         const filename = user.avatar.split('/avatars/')[1];
      //         fs.unlink(`images/avatars/${filename}`, (err) => {
      //           if(err) throw err;
      //         })
      //         await user.update( userObject)
      //         res.status(201).json( "Photo successfully updated ! ")
          

      //     } else {
      //         const filename = user.avatar.split('/avatars/')[1];
      //         fs.unlink(`images/avatars/${filename}`, (err) => {
      //           if(err) throw err;
      //         })
      //         await user.update(userObject)
      //             res.status(201).json( "User data & photo successfully updated ! ")
      //     }




      // } else {
      //     await user.update(userObject)
      //     return res.status(201).json( "User data successfully updated ! ");
      // }
  } catch(err) {
    return res.status(400).json({ Error: err.message})
  }
}
//-----------------------------------------------------------------------------------------------------