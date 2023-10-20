const { users } = require("../../prisma/client");

async function getUsers(req, res) {
  try {
    const usersList = await users.findMany();
    res.status(201).json(usersList);
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur :", err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la création de l'utilisateur.",
    });
  }
}

async function getOneUser(req, res) {
  try {
    const user = await users.findUnique({
      where: {
        id: parseInt(req.params.id), // parseInt transforme la string de l'url contenant l'id afin de la transformer en INT
      },
    });
    res.status(201).json(user);
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur :", err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la création de l'utilisateur.",
    });
  }
}

async function createUser(req, res) {
  try {
    const { username, firstname, lastname, email, password } = req.body;

    const newUser = await users.create({
      data: {
        username,
        firstname,
        lastname,
        email,
        password,
        signup_date: new Date(),
        profile_pic: "",
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la création de l'utilisateur.",
    });
  }
}



async function updateOneUser(req, res) {
    try {
      const { username, firstname, lastname, email, password, signup_date, profile_pic } = req.body;
  
      const updatedUser = await users.update({
        where: {id: parseInt(req.params.id) },
        data: {
          username,
          firstname,
          lastname,
          email,
          password,
          signup_date,
          profile_pic,
        },
      });
        res.json(updatedUser);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de l'utilisateur." });
    }
  }
module.exports = { getUsers, createUser, getOneUser, updateOneUser };
