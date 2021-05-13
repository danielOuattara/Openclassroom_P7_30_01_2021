
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg' :  'jpg',
    'image/jpeg': 'jpeg',
    'image/png' :  'png',
}

const storage = multer.diskStorage({

        destination: (req, file, callback) => {
            if(req.body.event === "photos")  {
                callback(null, "images/photos")
            }
            if(req.body.event === "avatars")  {
                callback(null, "images/avatars") 
            }
        },
        
        filename: (req, file, callback) => {
            const name = file.originalname.split(' ').join('_').split('.').slice(0, -1);
            const extension = MIME_TYPES[file.mimetype];
            callback( null, name + ('_') + Date.now() + '.' + extension)
        }
    }
);

module.exports = multer( {storage}).single('image');


// const storage = multer.diskStorage({

//         destination: (req, file, callback) => callback(null, "images/photos"),
        
//         filename: (req, file, callback) => {
//             const name = file.originalname.split(' ').join('_').split('.').slice(0, -1);
//             const extension = MIME_TYPES[file.mimetype];
//             callback( null, name + ('_') + Date.now() + '.' + extension)
//         }
//     }
// );

// module.exports = multer( {storage}).single('image');