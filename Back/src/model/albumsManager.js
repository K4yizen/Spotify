const { albums, songs ,songs_has_albums } = require("../../prisma/client");


const getOneAlbum = async (id) => {
    try {
      const getSong = await albums.findUnique({
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


 module.exports = { getOneAlbum }