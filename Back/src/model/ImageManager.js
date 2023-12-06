

const insertImage = async (data) => {
  try {
    const result = await prisma.image.create({
      data: { filename: data },
    });
    return { status: 201, message: { id: result.id, filename: data } };
  } catch (error) {
    return { status: 500, message: error };
  }
}

const fetchOneImage = async (id) => {
  try {
    const image = await prisma.image.findUnique({ where: { id } });
    if (!image) {
      return { status: 404, message: "Image not found" };
    }
    return { status: 200, message: image };
  } catch (error) {
    return { status: 500, message: error };
  }
}

module.exports = {
  insertImage,
  fetchOneImage,
};
