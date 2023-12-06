const { genres } = require("../../prisma/client")


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
  
  module.exports = { getGenreById }