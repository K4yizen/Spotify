const { users } = require("../../prisma/client");
const DEFAULT_PROFILE_PIC = "http://localhost:8888/images/UserProfilePicture/user-spotify.png";

const insertUser = async ({
  username,
  firstname,
  lastname,
  email,
  password,
  profile_pic,
})  => {
  try {
    const user = await users.create({
      data: {
        username,
        firstname,
        lastname,
        email,
        password,
        profile_pic: profile_pic || DEFAULT_PROFILE_PIC,
      },
    });
    return { status: 201, data: user };
  } catch (err) {
    console.error(err);
    return { status: 500, data: "Internal Error", err };
  }
};

const getUserById = async (id) => {
  try {
    const getUser = await users.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getUser) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getUser };
  } catch (err) {
    console.error(err);
    return { status: 500, data: "Internal Error" };
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await users.findFirst({
      where: {
        email: email,
      },
    });
    return { status: 200, data: user };
  } catch (err) {
    console.error(err);
    return { status: 500, data: "Internal Error" };
  }
};

const modifyUser = async (id, body) => {
  const { username, firstname, lastname, email, password, profile_pic } = body;
  try {
    const user = await users.update({
      where: {
        id: parseInt(id),
      },
      data: {
        username,
        firstname,
        lastname,
        email,
        password,
        profile_pic,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        password: false,
        profile_pic: false,
      },
    });
    return { status: 200, data: user };
  } catch (err) {
    console.error(err);
    return { status: 500, data: "Internal Error" };
  }
};

module.exports = {
  insertUser,
  modifyUser,
  getUserById,
  getUserByEmail,
};