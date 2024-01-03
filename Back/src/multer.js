const multer = require('multer');

// Fonction pour générer une nouvelle configuration de stockage
const generateStorage = (destination) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
};


const storageForUserProfilePicture = generateStorage('Images/UserProfilePicture');
const uploadUserProfilePicture = multer({ storage: storageForUserProfilePicture });   

const storageForAlbumCover = generateStorage('Images/AlbumCover');
const uploadAlbumCover = multer({ storage: storageForAlbumCover });

const storageForSongCover = generateStorage('Images/SongCover');
const uploadSongCover = multer({ storage: storageForSongCover})

const storageForGenrePicture = generateStorage('Images/CategoryPicture');
const uploadGenrePicture = multer({ storage: storageForGenrePicture})



module.exports = {
  uploadUserProfilePicture,
  uploadAlbumCover,
  uploadSongCover,
  uploadGenrePicture
};
