const bcrypt = require("bcryptjs");
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
          order: [
            ['createdAt', 'DESC']
          ],
          include: [
            { 
              model: Comment, 
              as:'comments',
              order: [
                ['createdAt', 'ASC']
              ], 
              include: [
                {
                  model: User,
                  as: 'owner'
                } 
              ]
            },
            { model: Like, as:'likes'}, 
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
          order: [
            ['createdAt', 'ASC']
          ],
          include: [
            { 
              model: Photo, 
              as:'photo' 
            },
            {
              model: User,
              as: 'owner'
            } 
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


exports.updateUserBackgroundImage = async (req, res) => {
  try {
    const user = await User.findOne( { where: {uuid : req.params.userUuid}})
    if (!user) {
      return res.status(404).send("User unknown !");
    }
    if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
      return res.status(403).send("Non Authorized !")  
    }
    
      const userObject =  { backgroundImage : `${req.protocol}://${req.get('host')}/images/backgrounds/${req.file.filename}` }   
      
      if (!user.backgroundImage) {
        await user.update(userObject)
        res.status(201).send("New background image successfully added !")  
      }  
      else {
        const filename = user.backgroundImage.split('/backgrounds/')[1];
        fs.unlink(`images/backgrounds/${filename}`, (err) => {
          if(err) throw err;
        });
        await user.update( userObject)
        res.status(201).send("Background Image successfully updated !")
      }
    } catch (err) {
      return res.status(500).send(err.message) 
    };
  }
  
// ---------------------------------------------------------------------------------------------------------------
  
  exports.updateUserAvatar = async (req, res) => {
    try {
      const user = await User.findOne( { where: {uuid : req.params.userUuid}})
      if (!user) {
        return res.status(404).send("User unknown !");
      }
      if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
        return res.status(403).send("Non Authorized !")  
      }
      
      const userObject = { avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}` }   
      
      if (!user.avatar) {
        await user.update(userObject)
        res.status(201).send("Avatar successfully added !")  
      }  
      else {
        const filename = user.avatar.split('/avatars/')[1];
        fs.unlink(`images/avatars/${filename}`, (err) => {
          if(err) throw err;
        });
        await user.update( userObject)
        res.status(201).send("Avatar successfully updated !")
      }
    } catch (err) {
      return res.status(500).send(err.message) 
    };
  }
  
// ---------------------------------------------------------------------------------------------------------------
  
  exports.updateUserInfos = async (req, res) => {
    try {
        const user = await User.findOne({ where: { uuid: req.params.userUuid } });
        if (!user) {
            return res.status(404).send("User unknown !");
        }
        if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
              return res.status(403).send("Non Authorized !")  
        }

        const userObject = {...req.body}  
        await user.update(userObject)
        res.status(201).json("Infos successfully updated !")  
    } catch(err) {
        return res.status(400).json({ Error: err.message})
    }
}

//--------------------------------------------------------------------------------

exports.updatePassword = async(req, res) => { 
    try {
        const user = await User.findOne({ where: { uuid: req.params.userUuid } })
        if (!user) {
            return res.status(404).send("User unknown!");
        }
        else if(user.id !== req.userId){
            return res.status(403).send("Non Authorized !")  
        }
        const passwordOld = await bcrypt.compare( req.body.passwordOld, user.password);
        if(!passwordOld) {
            return res.status(403).send(" Non Unauthorized !");
        }
        const newPassword = await bcrypt.hash(req.body.password, 11);
        await user.update({ password: newPassword})
        return res.status(200).send("Password successfully updated !")
    }catch(err) {
        return res.status(500).send(err.message)
    } 
}