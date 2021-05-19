
// ------------------------------------------------------------------------------------------------------------------------

const title = (req, res, next) => {
        const title = req.body.title;
        if(!title) {
         return res.status(400).send({message:`Title is required` });
       }
     next();
}

// --------------------------------------------------------------------------------------------------------

const imageUrl =  (req, res, next) => {
    // const imageUrl = `${req.protocol}://${req.get('host')}/images/photos/${req.file.filename}` 
    // if(!imageUrl) {
    console.log("=================" , req.file)
    if(!req.file) {
         return res.status(400).json("Error : photo file is require.");
    }
    next();
}

// ------------------------------------------------------------------------------------------------------------------------
const checksPhoto = {
    title,
    imageUrl,
};

module.exports = checksPhoto;