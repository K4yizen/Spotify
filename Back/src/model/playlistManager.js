const { playlists, playlists_has_users,} = require("../../prisma/client");

const createPlaylist = async ({ name, users_id, playlistCover }) => {
    try {
      const newPlaylist = await playlists.create({
        data: {
          name,
          users_id,
          playlistCover,
        },
      });
      return { status: 201, data: newPlaylist };
    } catch (error) {
      console.error(error);
      return { status: 500, data: 'Erreur interne lors de la création de la playlist' };
    }
  };


const getPlaylists = async () => {
    try {
      const allPlaylists = await playlists.findMany();
      return { status: 200, data: allPlaylists };
    } catch (error) {
      console.error(error);
      return { status: 500, data: 'Erreur interne lors de la récupération des playlists' };
    }
  };
  
  const getPlaylistById = async (playlistId) => {
    try {
      const playlist = await playlists.findUnique({
        where: { id: playlistId },
      });
      return { status: 200, data: playlist };
    } catch (error) {
      console.error(error);
      return { status: 500, data: 'Erreur interne lors de la récupération de la playlist' };
    }
  };
  
  const updatePlaylist = async (playlistId, { name, playlistCover }) => {
    try {
      const updatedPlaylist = await playlists.update({
        where: { id: playlistId },
        data: {
          name,
          playlistCover,
        },
      });
      return { status: 200, data: updatedPlaylist };
    } catch (error) {
      console.error(error);
      return { status: 500, data: 'Erreur interne lors de la mise à jour de la playlist' };
    }
  };
  
  const deletePlaylist = async (playlistId) => {
    try {
      await playlists.delete({
        where: { id: playlistId },
      });
      return { status: 200, data: 'Playlist supprimée avec succès' };
    } catch (error) {
      console.error(error);
      return { status: 500, data: 'Erreur interne lors de la suppression de la playlist' };
    }
  };

  const getAllPlaylistsHasUsers = async () => {
    try {
      const data = await playlists_has_users.findMany();
      return { status: 200, data };
    } catch (error) {
      console.error(error);
      return { status: 500, data: 'Erreur interne lors de la récupération des relations playlists_has_users' };
    }
  };

  
  const followPlaylist = async (users_id, playlists_id) => {
    try {
      await playlists_has_users.create({
        data: {
          users_id,
          playlists_id,
        },
      });
      return { status: 200, data: "Playlist suivie avec succès" };
    } catch (error) {
      console.error(error);
      return { status: 500, data: "Erreur interne" };
    }
  };
  
const unfollowPlaylist = async (users_id, playlists_id) => {
  try {
    await playlists_has_users.deleteMany({
      where: {
        users_id: users_id,
        playlists_id: playlists_id,
      },
    });
    return { status: 200, data: "Playlist retirée avec succès" };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Erreur interne" };
  }
};


module.exports = {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  getAllPlaylistsHasUsers,
  followPlaylist,
  unfollowPlaylist,
};
