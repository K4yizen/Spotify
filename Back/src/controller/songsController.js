const {
  insertSongs,
  getOneSong,
  getSongs,
  modifySong,
} = require("../model/songManager");
const { uploadSongs } = require("../multer")
const multer = require('multer');



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

async function createSongs(req, res) {
  try {
    // Utilisez la fonction d'upload de Multer pour gérer les fichiers
     uploadSongs.single('song')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ status: 400, data: 'Bad Request: File upload error.' });
      } else if (err) {
        return res.status(500).json({ status: 500, data: 'Internal Error' });
      }

      // Obtenez le chemin du fichier téléchargé
      const path = req.file ? req.file.path : null;

      // Appelez votre gestionnaire pour insérer la chanson avec les données et le fichier traités
      const result = await insertSongs({ ...req.body, path });

      // Retournez la réponse appropriée
      return res.status(result.status).json(result);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, data: 'Internal Error' });
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

module.exports = { getAllSongs, getOneMusic, createSongs, updateOneSong };
