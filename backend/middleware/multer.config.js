
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg' :  'jpg',
    'image/jpeg': 'jpeg',
    'image/png' :  'png',
}

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const storage = multer.diskStorage({

        destination: (req, file, callback) => {
            if (req.body.event === "avatars")  {
                callback(null, "images/avatars")
            }
            else if (req.body.event === "backgrounds")  {
                callback(null, "images/backgrounds")
            }
            else {
                callback(null, "images/photos") 
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