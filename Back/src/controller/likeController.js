const {
  getLikesByUser,
  likeSong,
  unlikeSong,
  getLikesByUserAndArtist,
} = require("../model/likeManager");

const getUserLikes = async (req, res) => {
  const userId = req.params.id;

  try {
    const userLikes = await getLikesByUser(parseInt(userId, 10));
    res.json(userLikes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne" });
  }
};

const getUserLikesByArtist = async (req, res) => {
  const { userId, artistId } = req.params;

  try {
      // Utilisez le gestionnaire pour récupérer les likes de l'utilisateur filtrés par l'ID de l'artiste
      const userLikesByArtist = await getLikesByUserAndArtist(
          parseInt(userId, 10),
          parseInt(artistId, 10)
      );

      res.json(userLikesByArtist);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur interne" });
  }
};


const addLike = async (req, res) => {
  const { users_id, songs_id } = req.body;
  console.log(req.body);

  try {
    const result = await likeSong(
      parseInt(users_id, 10),
      parseInt(songs_id, 10)
    );
    res.status(result.status).json({ data: result.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne" });
  }
};

const removeLike = async (req, res) => {
  const { users_id, songs_id } = req.body;

  try {
    const result = await unlikeSong(
      parseInt(users_id, 10),
      parseInt(songs_id, 10)
    );
    res.status(result.status).json({ data: result.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne" });
  }
};

module.exports = {
  getUserLikes,
  addLike,
  removeLike,
  getUserLikesByArtist
};
