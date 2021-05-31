
const db = require("./../models");
const { Photo, Like } = require('./../models');
const Op = db.Sequelize.Op;

//-----------------------------------------------------------------------------------------

exports.photoLikes = async (req, res) => {
    try  {
      const photo = await Photo.findOne({ where: { uuid: req.params.photoUuid} });
      if(!photo)  {
        return res.status(404).send(`Photo unknown`);
      }

      switch (req.body.value) {
          case 1:
          case -1:
              await Like.create({
                  value: req.body.value,
                  ownerId: req.userId,
                  photoId: photo.id
              });
              res.status(201).send("Voted successfully");
              break;
          case 0:
              await Like.destroy({ 
                  where: { [Op.and]: [ {ownerId: req.userId}, {photoId: photo.id} ]}
              });
              res.status(201).send("Voted successfully");
              break;
          default:
              res.status(400).send("Bad Request !");
      }
    } catch(err){
        return res.status(500).json(err.message);
    }
}
//---------------------------------------------------------------------------------------

exports.photoLikesCounting = async (req, res) => {
    try {
        const photo = await Photo.findOne({ where: { uuid: req.params.photoUuid} });
        if(!photo)  {
            return res.status(404).send(`Photo unknown`);
        }
        const userLikes = await Like.count({
            where: { [Op.and]: [ {photoId: photo.id}, {value: 1} ] },
            distinct: true,
        });
        const userDisLikes = await Like.count({
            where: { [Op.and]: [ {photoId: photo.id},  {value: -1} ] },
            distinct: true,
        });
        const result = { userLikes, userDisLikes};
        res.status(200).json(result);

      } catch(err) {
            return res.status(500).json({message: err.message});
      }
}

