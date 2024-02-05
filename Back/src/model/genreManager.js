const { genres } = require("../../prisma/client");

const getGenreById = async (id) => {
  try {
    const getOneGenre = await genres.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getOneGenre) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getOneGenre };
  } catch (err) {
    console.error(err);
    return { status: 500, data: "Internal Error" };
  }
};

async function putGenre(id, categoryName, categoryColor, categoryPictures) {
  try {
    const existingGenre = await getGenreById(id);

    if (!existingGenre) {
      throw new Error("Genre not found");
    }

    const updatedGenre = await genres.update({
      where: { id: parseInt(id) },
      data: {
        categoryName,
        categoryColor,
        categoryPictures,
      },
    });

    return updatedGenre;
  } catch (error) {
    console.error("Error updating genre:", error);
    throw error;
  }
}

const createGenre = async (categoryName, categoryColor, categoryPictures) => {
  try {
    const newGenre = await genres.create({
      data: {
        categoryName,
        categoryColor,
        categoryPictures,
      },
    });

    return newGenre;
  } catch (error) {
    console.error("Error creating genre:", error);
    throw error;
  }
};

const getSongsByGenre = async (genreId) => {
  try {
    const genre = await genres.findUnique({
      where: { id: parseInt(genreId, 10) },
      include: {
        songs: true,
      },
    });

    if (!genre) {
      return null;
    }

    return genre.songs;
  } catch (error) {
    console.error("Error fetching songs by genre:", error);
    throw error;
  }
};

const getAlbumsByGenre = async (genreId) => {
  try {
    const genre = await genres.findUnique({
      where: { id: parseInt(genreId, 10) },
      include: {
        albums: true,
      },
    });

    if (!genre) {
      return null;
    }

    return genre.albums;
  } catch (error) {
    console.error('Error fetching albums by genre:', error);
    throw error;
  }
};

module.exports = { getGenreById, createGenre, putGenre, getSongsByGenre, getAlbumsByGenre };
