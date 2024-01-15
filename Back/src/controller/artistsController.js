const { artists } = require("../../prisma/client");
const { createNewArtist, getArtistById, followArtist, unfollowArtist } = require("../model/artistsManager");

async function createArtist(req, res) {
  try {
    const { status, data } = await createNewArtist(req.body);
    res.status(status).send(data);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la création de l'artiste.",
      err,
    });
  }
}

async function getArtists(req, res) {
  try {
    const artistsList = await artists.findMany();
    res.status(201).json(artistsList);
  } catch (err) {
    console.error("Erreur lors de la création de l'artiste :", err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la création de l'artiste.",
    });
  }
}

async function getOneArtist(req, res) {
  try {
    const { status, data } = await getArtistById(req.params.id);
    res.status(status).send(data);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de l'obtention de l'artiste.",
      err,
    });
  }
}

async function followArtistController(req, res) {
  try {
    const { users_id, artists_userId } = req.body;
    const { status, data } = await followArtist(users_id, artists_userId);
    res.status(status).json({ message: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne' });
  }
} 

async function unfollowArtistController(req, res) {
  try {
    const { users_id, artists_userId } = req.body;
    const { status, data } = await unfollowArtist(users_id, artists_userId);
    res.status(status).json({ message: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne' });
  }
}

module.exports = { createArtist, getOneArtist, getArtists, followArtistController, unfollowArtistController };
