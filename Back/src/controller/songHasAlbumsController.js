
const songsHasAlbumsModel = require('../model/songManager');

const songsHasAlbumsController = {
  associateSongWithAlbum: async (songId, albumId, order) => {
    try {
      const data = {
        songs_id: songId,
        albums_id: albumId,
        order: order || 0, // Définissez une valeur par défaut pour l'ordre si nécessaire
      };
      await songsHasAlbumsModel.create(data);
      return { status: 200, data: 'Association réussie' };
    } catch (error) {
      console.error(error);
      return { status: 500, data: 'Erreur interne' };
    }
  },
  // Ajoutez d'autres méthodes si nécessaire
};

module.exports = songsHasAlbumsController;
