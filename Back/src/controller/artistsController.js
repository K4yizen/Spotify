const { artists } = require("../../prisma/client");
const { createNewArtist, getArtistById } = require("../model/artistsManager");

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

module.exports = { createArtist, getOneArtist, getArtists };
