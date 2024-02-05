const { artists, artists_has_songs, follow } = require("../../prisma/client");

const createNewArtist = async ({ name, artistCover, users_id }) => {
  console.log("Received users_id:", users_id);
  console.log("Type of users_id:", typeof users_id); // Assurez-vous qu'il s'agit d'un nombre (type 'number')

  try {
    const artist = await artists.create({
      data: {
        name: name,
        artistCover: artistCover,
        users: {
          connect: { id: parseInt(users_id) },
        },
      },
      select: {
        name: true,
        artistCover: false,
        users_id: false,
        users: false,
      },
    });
    return { status: 201, data: artist };
  } catch (err) {
    console.error(err);
    return { status: 500, data: "Internal Error" };
  }
};

const getArtistById = async (id) => {
  try {
    const getArtist = await artists.findUnique({
      where: {
        userId: parseInt(id),
      },
    });
    if (!getArtist) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getArtist };
  } catch (err) {
    console.error(err);
    return { status: 500, data: "Internal Error" };
  }
};

const getSongsByArtist = async (artistId) => {
  try {
    const songsByArtist = await artists_has_songs.findMany({
      where: {
        artists_userId: artistId,
      },
      include: {
        songs: true,
      },
    });
    return songsByArtist;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des chansons de l'artiste :",
      error
    );
    throw new Error("Internal Error");
  }
};

const linkArtistToSong = async (artists_userId, songs_id) => {
  try {
    const link = await artists_has_songs.create({
      data: {
        artists_userId: artists_userId,
        songs_id,
      },
    });
    return { status: 200, data: link };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      data: "Internal Error, Erreur lors de la liaison de l'artiste à la chanson",
    };
    // throw new Error("Erreur lors de la liaison de l'artiste à la chanson");
  }
};

const getFollowArtistByUser = async (users_id) => {
  try {
    const artists = await follow.findMany({
      where: {
        users_id : parseInt(users_id)
      },
      select: {
        users_id: true,
        artists_userId: true,
      },
    });
    return { status: 200, data: artists };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      data: "Internal Error, Erreur lors de la l'obtention des artistes suivies par l'utilisateurs !",
    };
    // throw new Error("Erreur lors de la liaison de l'artiste à la chanson");
  }
};

const followArtist = async (users_id, artists_userId) => {
  try {
    await follow.create({
      data: {
        users_id,
        artists_userId,
      },
    });
    return { status: 200, data: "Artiste suivi avec succès" };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Erreur interne" };
  }
};

const unfollowArtist = async (users_id, artists_userId) => {
  try {
    await follow.delete({
      where: {
        users_id_artists_userId: {
          users_id,
          artists_userId,
        },
      },
    });
    return { status: 200, data: "Artiste unfollow avec succès" };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Erreur interne" };
  }
};

const checkIfUserIsFollowing = async (users_id, artistId) => {
  try {
    const IsUserFollowing = await follow.findUnique({
      where: {
        users_id_artists_userId: {
          users_id: parseInt(users_id),
          artists_userId: parseInt(artistId),
        },
      },
    });

    return IsUserFollowing !== null;
  } catch (err) {
    console.error(err);
    throw new Error("Erreur lors de la vérification du suivi de l'artiste par l'utilisateur");
  }
};

module.exports = {
  createNewArtist,
  getArtistById,
  linkArtistToSong,
  followArtist,
  unfollowArtist,
  getSongsByArtist,
  getFollowArtistByUser,
  checkIfUserIsFollowing
};
