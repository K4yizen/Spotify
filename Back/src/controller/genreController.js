const { genres } = require("../../prisma/client");
const { getGenreById, createGenre, putGenre, getSongsByGenre, getAlbumsByGenre } = require("../model/genreManager");

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
      const { status, data } = await getGenreById(req.params.id);
      res.status(status).send(data);
    } catch (err) {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de l'obtention du genre.",
        err,
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

  async function insertGenre(req, res) {
    try {
      const { categoryName, categoryColor, categoryPictures } = req.body;
  
      const result = await createGenre(categoryName, categoryColor, categoryPictures);
  
      return res.status(201).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, data: 'Internal Error' });
    }
  }

  async function updateGenre(req, res) {
    try {
      const { id } = req.params;
      const { categoryName, categoryColor, categoryPictures } = req.body;
  
      // Appelez le manager pour mettre à jour le genre
      const updatedGenre = await putGenre(id, categoryName, categoryColor, categoryPictures);
  
      // Retournez la réponse appropriée
      return res.status(200).json(updatedGenre);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, data: 'Internal Error' });
    }
  }

  const getSongsByGenreController = async (req, res) => {
    try {
      const { genreId } = req.params;
  
      const songs = await getSongsByGenre(genreId);
  
      if (!songs) {
        return res.status(404).json({ message: 'Genre not found' });
      }
  
      return res.json(songs);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, data: 'Internal Error' });
    }
  };

  const getAlbumsByGenreController = async (req, res) => {
    try {
      const { genreId } = req.params;
  
      const albums = await getAlbumsByGenre(genreId);
  
      if (!albums) {
        return res.status(404).json({ message: 'Genre not found' });
      }
  
      return res.json(albums);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, data: 'Internal Error' });
    }
  };
  
  module.exports = { getGenres, getOneGenre, deleteGenre, insertGenre, updateGenre, getSongsByGenreController, getAlbumsByGenreController}