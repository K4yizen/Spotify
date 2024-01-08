const { albums } = require("../../prisma/client");

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


// createAlbumsSongs

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

module.exports = { getAlbums, createAlbums };
