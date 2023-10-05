const express = require("express");
const router = express.Router();

const { getUsers, createUser, getOneUser, updateOneUser } = require("../controller/userController");
const {getSongs, getOneSongs, createSongs, updateOneSong} = require("../controller/songsController")
const { getAlbums, createAlbums} = require("../controller/albumsController")

//users

router.get("/users", getUsers);
router.get("/users/:id", getOneUser);
router.post("/users", createUser);
router.put("/users/:id", updateOneUser)

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


module.exports = router;