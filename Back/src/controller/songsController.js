const {
  insertSongs,
  getOneSong,
  getSongs,
  modifySong,
  songsHasAlbums,
} = require("../model/songManager");

const { linkArtistToSong, getSongsByArtist } = require("../model/artistsManager");
const { uploadSongs } = require("../multer");
const multer = require("multer");
const { createAlbums } = require("./albumsController");
const { songs_has_albums } = require("../../prisma/client");
const mm = require('music-metadata');

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getAllSongs(req, res) {
  try {
    const { status, data } = await getSongs();
    res.status(status).send(data);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de l'obtention de l'utilisateur.",
      err,
    });
  }
}

async function getOneMusic(req, res) {
  try {
    const { status, data } = await getOneSong(req.params.id);
    res.status(status).send(data);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de l'obtention de l'utilisateur.",
      err,
    });
  }
}

async function createSongs(req, res) {
  try {
    uploadSongs.single("song")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ status: 400, data: "Bad Request: File upload error." });
      } else if (err) {
        return res.status(500).json({ status: 500, data: "Internal Error" });
      }

      const createdSong = await insertSongs({
        ...req.body,
        req: req,
      });

      console.log(createdSong.data.id);

      if (createdSong.data.title) {
        const createdAlbum = await createAlbums(
          {
            albumName: createdSong.data.title,
            artist: createdSong.data.artist,
            albumCover: createdSong.data.songCover,
            genres_id: createdSong.data.genres_id,
          },
          req,
          res
        );

        console.log(createdAlbum);

        await songsHasAlbumsController.associateSongWithAlbum(
          createdSong.data.id,
          createdAlbum.id,
          req.body.albumOrder
        );

        await linkArtistToSong(1, createdSong.data.id);
      }

      return res
        .status(201)
        .json({ message: "Chanson créée avec succès", data: createdSong });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, data: "Internal Error" });
  }
}

async function updateOneSong(req, res) {
  try {
    const { status, data } = await modifySong(req.params.id, req.body);
    res.status(status).send(data);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la modification de la musique.",
      err,
    });
  }
}

const songsHasAlbumsController = {
  associateSongWithAlbum: async (songId, albumId, order) => {
    try {
      const data = {
        songs_id: songId,
        albums_id: albumId,
        order: order || 0, // Définissez une valeur par défaut pour l'ordre si nécessaire
      };
      await songsHasAlbums.create(data);
      return { status: 200, data: "Association réussie" };
    } catch (error) {
      console.error(error);
      return { status: 500, data: "Erreur interne" };
    }
  },
  // Ajoutez d'autres méthodes si nécessaire
};

async function getSongsWithAlbums(req, res) {
  try {
    const songsWithAlbums = await songs_has_albums.findMany({
      include: {
        songs: true,
        albums: true,
      },
    });

    res.status(200).json(songsWithAlbums);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des chansons avec albums :",
      error
    );
    res.status(500).json({ message: "Internal Error" });
  }
}

async function getSongsByArtistController(req, res) {
  try {
    const artistId = parseInt(req.params.id);
    const songsByArtist = await getSongsByArtist(artistId);
    res.status(200).json(songsByArtist);
  } catch (error) {
    console.error("Erreur lors de la récupération des chansons de l'artiste :", error);
    res.status(500).json({ message: "Internal Error" });
  }
}




module.exports = {
  getAllSongs,
  getOneMusic,
  createSongs,
  updateOneSong,
  songsHasAlbumsController,
  getSongsWithAlbums,
  getSongsByArtistController,
};
