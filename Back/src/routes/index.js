const express = require("express");
const router = express.Router();

const {
  uploadUserProfilePicture,
  uploadAlbumCover,
  uploadSongCover,
  uploadGenrePicture,
} = require("../multer");

const { hashPassword } = require("../../services/passwordHelper");
const { login } = require("../controller/authController");

const {
  getUsers,
  createUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
} = require("../controller/userController");

const {
  getAllSongs,
  getOneMusic,
  createSongs,
  updateOneSong,
  getSongsWithAlbums,
  getSongsByArtistController,
} = require("../controller/songsController");

const {
  getAlbums,
  createAlbumWithSongs,
  getSingleAlbum,
  deleteOneAlbum,
} = require("../controller/albumsController");

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
  followArtistController,
  unfollowArtistController,
} = require("../controller/artistsController");


const {
  followPlaylistController,
  unfollowPlaylistController,
  createPlaylistController,
  getPlaylistsController,
  getPlaylistByIdController,
  updatePlaylistController,
  deletePlaylistController,
  getAllPlaylistsHasUsersController,
} = require("../controller/playlistController");
const { addLike, removeLike, getUserLikes, getUserLikesByArtist, } = require("../controller/likeController");

// auth

router.post("/login", login);


//users

router.get("/users", getUsers);
router.get("/users/:id", getOneUser);
router.post("/users", createUser);
router.post("/users-test",hashPassword, createUser);
router.put("/users/:id", updateOneUser);
router.delete("/users/:id", deleteOneUser);

//artists

router.get("/artists", getArtists);
router.get("/artists/:id", getOneArtist);
router.post("/artists", createArtist);
router.post("/follow", followArtistController);
router.post("/unfollow", unfollowArtistController);

//songs

router.get("/songs", getAllSongs);
router.get("/songs-albums", getSongsWithAlbums);
router.get("/songs/:id", getOneMusic);
router.get("/songs-artist/:id", getSongsByArtistController);
router.post("/songs", createSongs);
router.put("/songs/:id", updateOneSong);

// likes
router.get('/like-song/:userId/:artistId', getUserLikesByArtist);
router.get("/like-song/:id", getUserLikes );
router.get("/like-song/:id", getUserLikes );
router.post("/like-song", addLike);
router.post("/unlike-song", removeLike);


//playlist  

router.get("/playlist", getPlaylistsController);
router.get("/playlist/:id", getPlaylistByIdController);
router.post("/playlist", createPlaylistController);
router.put("/playlist/:id", updatePlaylistController)
router.delete("/playlist/:id", deletePlaylistController)
router.get('/playlists-users', getAllPlaylistsHasUsersController);
router.post("/follow-playlist", followPlaylistController);
router.post("/unfollow-playlist", unfollowPlaylistController);

//albums

router.get("/albums", getAlbums);
router.get("/albums/:id", getSingleAlbum);
router.post("/albums", createAlbumWithSongs);
// router.put("/albums/:id", updateOneAlbum)
router.delete("/albums/:id", deleteOneAlbum);

//genres

router.get("/genres", getGenres);
router.get("/genres/:id", getOneGenre);
router.delete("/genres/:id", deleteGenre);
router.post("/genres", insertGenre);
router.put("/genres/:id", updateGenre);

//upload

router.post(
  "/upload/profilePicture",
  uploadUserProfilePicture.single("userImage"),
  (req, res) => {
    return res.status(200).send("User Image Uploaded");
  }
);

router.post(
  "/upload/albumCover",
  uploadAlbumCover.single("albumCover"),
  (req, res) => {
    return res.status(200).send("Album Cover Uploaded");
  }
);

router.post(
  "/upload/songCover",
  uploadSongCover.single("songCover"),
  (req, res) => {
    return res.status(200).send("Song Cover Uploaded");
  }
);

router.post(
  "/upload/categoryPicture",
  uploadGenrePicture.single("genrePicture"),
  (req, res) => {
    return res.status(200).send("Category Picture Uploaded");
  }
);

module.exports = router;
