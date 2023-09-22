const { songs } = require("../../prisma/client");

async function getSongs(req, res) {
  try {
    const songsList = await songs.findMany();
    res.json(songsList);

  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur :", err);
    res.status(500).json({
        message:
          "Une erreur s'est produite lors de la création de l'utilisateur.",
      });
  }
}

async function createSongs(req, res) {
    try {
      const { title, artist, album, duration, path, albumOrder, plays,albums_id, genres_id, songCover } = req.body;
  
      const newSong = await songs.create({
        data: {
            title,
            artist,
            album,
            duration,
            path,
            albumOrder,
            plays,
            albums_id,
            genres_id,
            songCover,
        },
      });
        res.status(201).json(newSong);
    } catch (err) {
      console.error("Erreur lors de la création de l'utilisateur :", err);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la création de l'utilisateur.",
      });
    }
  }



module.exports = {getSongs, createSongs}
