const { albums, songs ,songs_has_albums } = require("../../prisma/client");
const { getOneAlbum } = require("../model/albumsManager");
const { uploadSongs } = require("../multer");
const multer = require('multer');
const mm = require('music-metadata');

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}


async function getAlbums(req, res) {
  try {
    const albumList = await albums.findMany();
    res.json(albumList);
  } catch (err) {
    console.error("Erreur lors de l'obtention de l'album :", err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de l'obtention de l'album.",
    });
  }
}

async function getSingleAlbum(req, res) {
  try {
    const { status, data } = await getOneAlbum(req.params.id);
    res.status(status).send(data);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de l'obtention de l'utilisateur.",
      err,
    });
  }
}


// createAlbumForOneSong

async function createAlbums(albumData, req, res,) {
  try {
    const { albumName, albumCover, genres_id,} = albumData;

    console.log(albumData);

    const newAlbum = await albums.create({
      data: {
        title : albumName,
        albumCover : albumCover,
        genres_id,
      },
    });
    return newAlbum;
  } catch (err) {
    console.error("Erreur lors de la création de l'album :", err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la création de l'album.",
    });
  }
}

async function createAlbumWithSongs(req, res) {
  console.log("reached");
  try {
    // Utilisez la fonction d'upload de Multer pour gérer les fichiers
    uploadSongs.array('songs', 20)(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(400).json({ status: 400, data: "Bad Request: File upload error." });
      } else if (err) {
        console.log("InternalError:", err);
        return res.status(500).json({ status: 500, data: "Internal Error" });
      }

      // Obtenez les chemins des fichiers téléchargés
      const songPaths = req.files.map(file => file.path);

      console.log(req.body.title);

      // Créez l'album
      const createdAlbum = await albums.create({
        data: {
          title: req.body.title,
          albumCover: req.body.albumCover,
          genres_id: parseInt(req.body.genres_id),
        },
      });

      // Associez chaque chanson à l'album
      const createdSongs = [];
      for (let index = 0; index < songPaths.length; index++) {
        const songPath = songPaths[index];
        const metadata = await mm.parseFile(songPath);
        const createdSong = await songs.create({
          data: {
            title: req.body.title, // Assurez-vous d'avoir la logique appropriée pour gérer les titres des chansons
            artist: req.body.artist,
            albumName: req.body.title,
            duration: formatDuration(String(metadata.format.duration)),
            path: songPath,
            genres_id: parseInt(req.body.genres_id),
            albumOrder: index + 1,
            plays: 0,
            songCover: req.body.albumCover,    
        },
        });

        createdSongs.push(createdSong);

        // Associez la chanson à l'album
        await songs_has_albums.create({
          data: {
            songs: {
              connect: {
                id: createdSong.id,
              },
            },
            albums: {
              connect: {
                id: createdAlbum.id,
              },
            },
            order: index + 1, // Assurez-vous d'avoir la logique appropriée pour gérer l'ordre des chansons dans l'album
          },
        });
      }

      // Retournez la réponse appropriée
      return res.status(201).json({ message: "Album créé avec succès", data: { album: createdAlbum, songs: createdSongs } });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, data: "Internal Error" });
  }
}

async function deleteOneAlbum(req, res) {
  try {
    const userId = req.params.id;

    const { status, data } = await albums.delete({
      where: {
        id: parseInt(userId),
      },  
    });
    res.status(200).json({ message: "L'album a été supprimé avec succès."});

  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la supression de l'album.",
      err,
    });
  }
}

module.exports = { getAlbums, createAlbums, createAlbumWithSongs, getSingleAlbum, deleteOneAlbum };
