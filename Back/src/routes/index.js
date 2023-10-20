const express = require("express");
const router = express.Router();
const upload = require("./mutlerUpload")

const { getUsers, createUser, getOneUser, updateOneUser } = require("../controller/userController");
const {getSongs, getOneSongs, createSongs, updateOneSong} = require("../controller/songsController")
const { getAlbums, createAlbums} = require("../controller/albumsController");
const { getGenres, getOneGenre, deleteGenre } = require("../controller/genreController");
const { createArtist, getArtists, getOneArtist } = require("../controller/artistsController");

//users

router.get("/users", getUsers);
router.get("/users/:id", getOneUser);
router.post("/users", createUser);
router.put("/users/:id", updateOneUser)

//artists

router.get("/artists", getArtists)
router.get("/artists/:id", getOneArtist)
router.post("/artists", createArtist)

//songs

router.get("/songs", getSongs);
router.get("/songs/:id", getOneSongs);
router.post("/songs", createSongs);
router.put("/songs/:id", updateOneSong)

//albums

router.get("/albums", getAlbums);    
// router.get("/albums/:id", getOneAlbums)
router.post("/albums", createAlbums)
// router.put("/albums/:id", updateOneAlbum)

//genres

router.get("/genres", getGenres);
router.get("/genres/:id", getOneGenre);
router.delete("/genres/:id", deleteGenre);



module.exports = router;