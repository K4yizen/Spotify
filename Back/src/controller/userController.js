const { users } = require("../../prisma/client");

async function getUsers(req, res) {
  try {
    const usersList = await users.findMany();
    res.status(201).json(usersList);
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la création de l'utilisateur.",
    });
  }
}
 
async function createUser(req, res) {
  try {
    // Récupérez les données de la demande POST
    const { username, firstname, lastname, email, password } = req.body;

    // Créez un nouvel utilisateur dans la base de données
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

    // Répondez avec le nouvel utilisateur créé
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
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
