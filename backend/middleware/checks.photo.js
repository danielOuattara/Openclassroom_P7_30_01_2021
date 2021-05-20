
const { Photo } = require('../models');

// ------------------------------------------------------------------------------------------------------------------------

const title = (req, res, next) => {
    const title = req.body.title;
    if(!title) {
        return res.status(400).send({message:`Title is required` });
    }
    next();
}
// --------------------------------------------------------------------------------------------------------

const image =  (req, res, next) => {
    if(!req.file) {
         return res.status(400).json( {Error: "Photo file is require."});
    }
    next();
}
// ----------------------------------------------------------------------------

const photoKnown = async (req, res, next) => {
    try {
        const photo = await Photo.findOne({ where : {uuid: req.params.photoUuid }});
        if (!photo) {
            return res.status(404).json({ Error: " Photo unknown !"});
        }
        next();
    } 
    catch(err) { 
        err => res.status(500).json(err.message)
    }
}

// ------------------------------------------------------------------------------------------------------------------------
const checksPhoto = {
    title,
    image,
    photoKnown
};

module.exports = checksPhoto;