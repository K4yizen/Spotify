const express = require("express");
const router = express.Router();
const { uploadUserProfilePicture, uploadAlbumCover, uploadSongCover, uploadGenrePicture, uploadSongs }= require("../multer")


const {
  getUsers,
  createUser,
  getOneUser,
  updateOneUser,
  deleteOneUser
} = require("../controller/userController");
const {
  getAllSongs,
  getOneMusic,
  createSongs,
  updateOneSong,
  getSongsWithAlbums
} = require("../controller/songsController");
const { getAlbums, createAlbums } = require("../controller/albumsController");
const {
  getGenres,
  getOneGenre,
  deleteGenre,
  insertGenre,
  updateGenre,
} = require("../controller/genreController");
const {
  createArtist,
  getArtists,
  getOneArtist,
} = require("../controller/artistsController");
// const readImageController = require("../controller/imageController/ReadImageController");
// const createImageController = require("../controller/imageController/CreateImageController");

//users

router.get("/users", getUsers);
router.get("/users/:id", getOneUser);
router.post("/users", createUser);
router.put("/users/:id", updateOneUser);
router.delete("/users/:id", deleteOneUser);

//artists

router.get("/artists", getArtists);
router.get("/artists/:id", getOneArtist);
router.post("/artists", createArtist);

//songs

router.get("/songs", getAllSongs);
router.get("/songs-albums", getSongsWithAlbums);
router.get("/songs/:id", getOneMusic);
router.post("/songs", createSongs);
router.put("/songs/:id", updateOneSong);

//albums

router.get("/albums", getAlbums);
// router.get("/albums/:id", getOneAlbums)
router.post("/albums", createAlbums);
// router.put("/albums/:id", updateOneAlbum)

//genres

router.get("/genres", getGenres);
router.get("/genres/:id", getOneGenre);
router.delete("/genres/:id", deleteGenre);
router.post('/genres', insertGenre);
router.put("/genres/:id", updateGenre);



//upload

router.post("/upload/profilePicture", uploadUserProfilePicture.single("userImage"), (req, res) => {
  return res.status(200).send("User Image Uploaded");
});

router.post("/upload/albumCover", uploadAlbumCover.single("albumCover"), (req, res) => {
  return res.status(200).send("Album Cover Uploaded");
});

router.post("/upload/songCover", uploadSongCover.single("songCover"), (req, res) => {
  return res.status(200).send("Song Cover Uploaded");
});

router.post("/upload/categoryPicture", uploadGenrePicture.single("genrePicture"), (req, res) => {
  return res.status(200).send("Category Picture Uploaded");
});

// router.post("/upload/songs", uploadSongs.single("songs"), (req, res) => {
//   try {

//     return res.status(200).send("Song Uploaded");
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// router.post("/register", uploadUserProfilePicture.single("profile_pic"), (req, res) => {
//     console.log(req.file)
// }, createUser)

router.post('/register', uploadUserProfilePicture.single('profile_pic'), (req, res) => {
    try {
        console.log(req.file); // Affiche les détails du fichier
        console.log(req.body); // Affiche les données du formulaire (si utilisant enctype="multipart/form-data")
        
        // Création de l'utilisateur avec les données du formulaire
        createUser(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'inscription.' });
    }
  });

router.get("/images");

module.exports = router;
