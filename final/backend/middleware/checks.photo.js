
// ------------------------------------------------------------------------------------------------------------------------

const title = (req, res, next) => {
        const title = req.body.title;
        if(!title) {
         return res.status(400).send({message:`Title is required` });
       }
     next();
}

// const title = (req, res, next) => {
//     // try {
//         console.log(req);
//         const title = req.body.title;
//         if(!title) {
//             return res.status(400).json("Error : Photo title is require.");
//         }
//     // }
//     // catch(err){
//     //      return res.status(400).send({message: err.message });
//     // }
//      next();
// }

// --------------------------------------------------------------------------------------------------------

const imageUrl =  (req, res, next) => {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/photos/${req.file.filename}` 
    if(!imageUrl) {
         throw new Error(`imageUrl can not be empty`);
    }
    next();
}

// ------------------------------------------------------------------------------------------------------------------------
const checksPhoto = {
    title,
    imageUrl,
};

module.exports = checksPhoto;