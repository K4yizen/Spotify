const { songs, albums, songs_has_albums } = require("../../prisma/client");

// const insertSongs = async ({
//   title,
//   artist,
//   album,
//   duration,
//   path,
//   albumOrder,
//   plays,
//   albums_id,
//   genres_id,
//   songCover,
// }) => {
//   try {
//     const song = await songs.create({
//       data: {
//         title,
//         artist,
//         album,
//         duration,
//         path,
//         albumOrder: albumOrder || 1,
//         plays: plays || 0,
//         albums_id: albums_id || 1,
//         genres_id: genres_id || 1,
//         songCover: songCover || "",
//       },
//     });
//     return { status: 201, data: song };
//   } catch (err) {
//     console.error(err);
//     return { status: 500, data: "Internal Error" };
//   }
// };

const insertSongs = async ({
  title,
  artist,
  albumName,
  duration,
  songPath,
  albumOrder,
  plays,
  genres_id,
  albums_id,
  req,
}) => {
  try {
    // Vérifier si l'album existe déjà
    let album = null;
    if (albums_id) {
      album = await albums.findUnique({
        where: {
          id: albums_id,
        },
      });
    }

    // Si l'album n'existe pas, le créer
    if (!album) {
      album = await albums.create({
        data: {
          title: albumName,
          albumCover: req.body.songCover,
          genres_id: parseInt(req.body.genres_id),
        },
      });
    }

    const genresId = parseInt(req.body.genres_id, 10);

    const createdSong = await songs.create({
      data: {
        title,
        artist,
        albumName,
        duration,
        path: req?.file?.path || "",
        albumOrder: albumOrder || 1,
        plays: plays || 0,
        songCover: req.body.songCover,
        genres_id: genresId,
      },
    });

    return { status: 201, data: createdSong };
  } catch (err) {
    console.error(err);
    return { status: 500, data: "Internal Error" };
  }
};

const getSongs = async (id) => {
  try {
    const getSongs = await songs.findMany({});
    if (!getSongs) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getSongs };
  } catch (err) {
    console.error(err);
    return { status: 500, data: "Internal Error" };
  }
};

const getOneSong = async (id) => {
  try {
    const getSong = await songs.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getSong) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getSong };
  } catch (err) {
    console.error(err);
    return { status: 500, data: "Internal Error" };
  }
};

const modifySong = async (id, body) => {
  const {
    title,
    artist,
    album,
    duration,
    path,
    albumOrder,
    plays,
    albums_id,
    genres_id,
    songCover,
  } = body;
  try {
    const song = await songs.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        artist,
        album,
        duration,
        path,
        albumOrder,
        plays,
        albums_id,
        genres_id,
        songCover,
      },
    });
    return { status: 200, data: song };
  } catch (err) {
    console.error(err);
    return { status: 500, data: "Internal Error" };
  }
};

const songsHasAlbums = {
  create: async (data) => {
    return songs_has_albums.create({ data });
  },
};

module.exports = {
  insertSongs,
  modifySong,
  getOneSong,
  getSongs,
  songsHasAlbums,
};
