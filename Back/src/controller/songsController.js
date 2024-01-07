const {
  insertSongs,
  getOneSong,
  getSongs,
  modifySong,
  songsHasAlbums,
  associateSongWithAlbum,
} = require("../model/songManager");
const { uploadSongs } = require("../multer");
const multer = require("multer");
const { createAlbums } = require("./albumsController");

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

// async function createSongs(req, res) {
//   try {
//     console.log("Request body:", req.body);
//     const { status, data } = await insertSongs(req.body);
//     res.status(status).send(data);
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({
//       message: "Une erreur s'est produite lors de la création de la musique.",
//       err,
//     });
//   }
// }
// ...
async function createSongs(req, res) {
  try {
    // Utilisez la fonction d'upload de Multer pour gérer les fichiers
    uploadSongs.single("song")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ status: 400, data: "Bad Request: File upload error." });
      } else if (err) {
        return res.status(500).json({ status: 500, data: "Internal Error" });
      }

      // Obtenez le chemin du fichier téléchargé
      const songPath = req.file ? req.file.path : null;

      // Créez la chanson
      const createdSong = await insertSongs({
        ...req.body,
        songPath,
        req: req,
      });

      // Vérifiez si createdSong.albumName est défini
      if (createdSong.albumName) {
        // Créez l'album associé à la chanson en utilisant le nom de la chanson
        const createdAlbum = await createAlbums({
          albumName: createdSong.albumName,
          artist: createdSong.artist,
          albumCover: createdSong.songCoverPath,
          genres_id: createdSong.genres_id,
        });

        // Associez la chanson à l'album
        await songsHasAlbumsController.associateSongWithAlbum(
          createdSong.id,
          createdAlbum.id,
          req.body.albumOrder
        );
      }

      // Retournez la réponse appropriée
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

module.exports = {
  getAllSongs,
  getOneMusic,
  createSongs,
  updateOneSong,
  songsHasAlbumsController,
};
