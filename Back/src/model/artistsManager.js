const { artists } = require("../../prisma/client");

const createNewArtist = async ({ name, artistCover, userId }) => {
  try {
    const artist = await artists.create({
      data: {
        name: name,
        artistCover: artistCover,
        users: {
          connect: { id: userId },
        },
      },
      select: {
        name: true,
        artistCover: false,
        userId: false,
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
  

module.exports = { createNewArtist, getArtistById };
