const {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  followPlaylist,
  unfollowPlaylist,
  getAllPlaylistsHasUsers,
} = require("../model/playlistManager");

async function createPlaylistController(req, res) {
  try {
    const { name, users_id, playlistCover } = req.body;
    const { status, data } = await createPlaylist({
      name,
      users_id,
      playlistCover,
    });
    res.status(status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne" });
  }
}

async function getPlaylistsController(req, res) {
  try {
    const { status, data } = await getPlaylists();
    res.status(status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne" });
  }
}

async function getPlaylistByIdController(req, res) {
  try {
    const { id } = req.params;
    const { status, data } = await getPlaylistById(parseInt(id));
    res.status(status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne" });
  }
}

async function updatePlaylistController(req, res) {
  try {
    const { id } = req.params;
    const { name, playlistCover } = req.body;
    const { status, data } = await updatePlaylist(parseInt(id), {
      name,
      playlistCover,
    });
    res.status(status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne" });
  }
}

async function deletePlaylistController(req, res) {
  try {
    const { id } = req.params;
    const { status, data } = await deletePlaylist(parseInt(id));
    res.status(status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne" });
  }
}

async function getAllPlaylistsHasUsersController(req, res) {
  try {
    const { status, data } = await getAllPlaylistsHasUsers();
    res.status(status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne" });
  }
}

async function followPlaylistController(req, res) {
  try {
    const { users_id, playlists_id } = req.body;
    const { status, data } = await followPlaylist(users_id, playlists_id);
    res.status(status).json({ message: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne" });
  }
}

async function unfollowPlaylistController(req, res) {
  try {
    const { users_id, playlists_id } = req.body;
    const { status, data } = await unfollowPlaylist(users_id, playlists_id);
    res.status(status).json({ message: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne" });
  }
}

module.exports = {
  createPlaylistController,
  getPlaylistsController,
  getPlaylistByIdController,
  updatePlaylistController,
  deletePlaylistController,
  getAllPlaylistsHasUsersController,
  followPlaylistController,
  unfollowPlaylistController,
};
