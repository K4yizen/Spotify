const {
  insertSongs,
  getOneSong,
  getSongs,
  modifySong,
  likeSong,
  unlikeSong,
  songsHasAlbums,
} = require("../model/songManager");

const { linkArtistToSong } = require("../model/artistsManager");
const { uploadSongs } = require("../multer");
const multer = require("multer");
const { createAlbums } = require("./albumsController");
const { songs_has_albums } = require("../../prisma/client");

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
    // Utilisez la fonction d'upload de Multer pour gérer les fichiers à déplacer dans la route
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

      console.log(createdSong.data.id);

      // Vérifiez si createdSong.albumName est défini
      if (createdSong.data.title) {
        // Créez l'album associé à la chanson en utilisant le nom de la chanson
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

        // Associez la chanson à l'album
        await songsHasAlbumsController.associateSongWithAlbum(
          createdSong.data.id,
          createdAlbum.id,
          req.body.albumOrder
        );

        // Lier l'artiste à la chanson (remplacer 1 par l'id de lartist)
        await linkArtistToSong(1, createdSong.data.id);
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

async function likeSongController(req, res) {
  try {
    const { users_id, songs_id } = req.body;
    const { status, data } = await likeSong(users_id, songs_id);
    res.status(status).json({ message: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne' });
  }
}

async function unlikeSongController(req, res) {
  try {
    const { users_id, songs_id } = req.body;
    const { status, data } = await unlikeSong(users_id, songs_id);
    res.status(status).json({ message: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne' });
  }
}

module.exports = {
  getAllSongs,
  getOneMusic,
  createSongs,
  updateOneSong,
  songsHasAlbumsController,
  getSongsWithAlbums,
  likeSongController,
  unlikeSongController
};
