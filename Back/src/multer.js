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

const storageForSongCover = generateStorage('images/SongCover');
const uploadSongCover = multer({ storage: storageForSongCover})

const storageForGenrePicture = generateStorage('images/CategoryPicture');
const uploadGenrePicture = multer({ storage: storageForGenrePicture})

const storageForArtistePicture = generateStorage('public/images/ArtistePicture');
const uploadArtistePicture = multer({ storage: storageForArtistePicture})

const storageForSongs = generateStorage('public/songs');
const uploadSongs = multer({ storage: storageForSongs, fileFilter: audioFileFilter, files: 1, });

function audioFileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(mp3|wav)$/)) {
    return cb(new Error('Seuls les fichiers audio MP3 et WAV sont autorisés!'), false);
  }
  cb(null, true);
}

module.exports = {
  uploadUserProfilePicture,
  uploadAlbumCover,
  uploadSongCover,
  uploadGenrePicture,
  uploadSongs,
  uploadArtistePicture,
};
