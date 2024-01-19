const { user_likes } = require("../../prisma/client");

const getLikesByUser = async (users_id) => {
  try {
    const userLikes = await user_likes.findMany({
      where: {
        users_id: parseInt(users_id),
      },
      include: {
        songs: true,
      },
    });
    return userLikes;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des likes de l'utilisateur :",
      error
    );
    throw new Error("Internal Error");
  }
};

const getLikesByUserAndArtist = async (userId, artistId) => {
  try {
    const userLikesByArtist = await user_likes.findMany({
      where: {
        users_id: userId,
        songs: {
          artists_has_songs: {
            some: {
              artists_userId: artistId,
            },
          },
        },
      },
      include: {
        songs: true,
      },
    });

    return userLikesByArtist;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur interne");
  }
};

const likeSong = async (users_id, songs_id) => {
  try {
    await user_likes.create({
      data: {
        users_id,
        songs_id,
      },
    });
    return { status: 200, data: "Chanson likée avec succès" };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Erreur interne" };
  }
};

const unlikeSong = async (users_id, songs_id) => {
  try {
    await user_likes.deleteMany({
      where: {
        users_id,
        songs_id,
      },
    });
    return { status: 200, data: "Chanson unlikée avec succès" };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Erreur interne" };
  }
};

module.exports = {
  getLikesByUser,
  getLikesByUserAndArtist,
  likeSong,
  unlikeSong,
};
