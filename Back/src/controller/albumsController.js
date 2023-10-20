const { albums } = require("../../prisma/client");

async function getAlbums(req, res) {
  try {
    const albumList = await albums.findMany();
    res.json(songsList);
  } catch (err) {
    console.error("Erreur lors de la création de l'album :", err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la création de l'album.",
    });
  }
}

async function createAlbums(req, res) {
  try {
    const { title, artist, albumCover, genres_id } = req.body;

    const newAlbum = await albums.create({
      data: {
        title,
        artist,
        albumCover,
        genres_id,
      },
    });
    res.status(201).json(newAlbum);
  } catch (err) {
    console.error("Erreur lors de la création de l'album :", err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la création de l'album.",
    });
  }
}

module.exports = { getAlbums, createAlbums };
