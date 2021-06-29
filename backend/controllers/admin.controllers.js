
const { User, Photo, Comment, PhotosReports, CommentsReports } = require('./../models');

// ------------------------------------------------------------------------------

exports.getPhotoReports = async (req, res) => {
    try {
        if(!req.userRoles.includes("ROLE_ADMIN")){
            return res.status(403).json({ Error : "Non Authorized !" })  
        }
        const reports = await PhotosReports.findAll({ 
          where: {}, 
          order: [ ['createdAt', 'ASC'] ],
          include: [
            {
              model: User,
              as: 'owner',
            }, 
            {
              model: Photo,
              as: 'photo',
              include: [ 
                {
                  model: User, 
                  as: 'owner'
                } 
              ],
            }, 
           ],
        })
        res.status(200).json(reports)
    } catch(err) {
      return res.status(500).send(err.message )
    }
}

// ----------------------------------------------------------------------------------

exports.getPhotoCommentReports = async (req, res) => {
    try {
        if(!req.userRoles.includes("ROLE_ADMIN")){
            return res.status(403).json({ Error : "Non Authorized !" })  
        }
        const commentsReports = await CommentsReports.findAll({ 
          where: {}, 
          order: [ ['createdAt', 'ASC'] ],
          include: [
            {
              model: User,
              as: 'owner',
            }, 
            {
              model: Comment,
              as: 'comment',
              include: [ 
                {
                  model: User, 
                  as: 'owner'
                } 
              ],
            }, 
         ],
        })
return res.status(200).send(commentsReports)
    } catch(err) {
        return res.status(403).send(err.message )
    }
}

// ----------------------------------------------------------------------------------

exports.updatePhotoReportStatus = async (req, res) => { }

exports.updatePhotoCommentReportStatus = async (req, res) => {}