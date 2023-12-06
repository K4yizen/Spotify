const { songs } = require("../../prisma/client");
const { insertSongs, getOneSong, getSongs, modifySong } = require("../model/songManager");

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
    const { status, data } = await insertSongs(req.body);
    res.status(status).send(data);
  } catch (err) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de la création de la musique.",
      err,
    });
  }
}

async function updateOneSong(req, res) {
  try{
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

module.exports = { getAllSongs, getOneMusic, createSongs, updateOneSong };
