const { genres } = require("../../prisma/client")

async function getGenres(req, res) {
    try {
      const genresList = await genres.findMany();
      res.status(201).json(genresList);
    } catch (error) {
      console.error("Erreur lors de la récupération des genres :", error);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération des genres.",
      });
    }
  }

  async function getOneGenre(req, res) {
    try {
      const genre = await genres.findUnique({
        where : {
            id : parseInt(req.params.id)
        }
      });
      res.status(201).json(genre);
    } catch (error) {
      console.error("Erreur lors de la récupération du genre :", error);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération du genre",
      });
    }
  }


  async function deleteGenre(req, res) {
    try {
      const deleteGenre = await genres.delete({
        where: {
          id: parseInt(req.params.id), 
        },
      });
      res.status(204).send({}); 
    } catch (err) {
      console.error("Erreur lors de la suppresion du genre :", err);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la suppresion du genre.",
      });
    }
  }
  
  module.exports = { getGenres, getOneGenre, deleteGenre}