
// ------------------------------------------------------------------------------------------------------------------------
const title = ( req, res, next) => {
    try {
        console.log("req = ", req)
        const title = req.body.title;
        if(!title) throw new Error(`Title is required !`);
       
    }
    catch(err){
            return res.status(400).send({message: err.message });
    }
     next();
}

// --------------------------------------------------------------------------------------------------------

const imageUrl = (req, res, next) => {
    try {
        const image = `${req.protocol}://${req.get('host')}/images/photos/${req.file.filename}`;
        if(!image) throw new Error(`imageUrl can not be empty`);
    }
    catch(err){
            return res.status(400).send({message: err.message });
    }
    next();
}

// ------------------------------------------------------------------------------------------------------------------------
const checksPhoto = {
    title,
    imageUrl,
};

module.exports = checksPhoto;