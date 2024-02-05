const { users } = require("../../prisma/client");
const { insertUser, modifyUser, getUserById } = require("../model/userManager");

async function getUsers(req, res) {
  try {
    const usersList = await users.findMany();
    res.status(200).json(usersList);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de l'obtention de l'utilisateur.",
    });
  }
}

async function getOneUser(req, res) {
  try {
    const { status, data } = await getUserById(req.params.id);
    res.status(status).send(data);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de l'obtention de l'utilisateur.",
      err,
    });
  }
}

async function createUser(req, res) {
  try {
    const { status, data } = await insertUser(req.body);
    res.status(status).send(data);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la création de l'utilisateur.",
      err,
    }); 
  }
}

async function updateOneUser(req, res) {
  try {
    const { status, data } = await modifyUser(req.params.id, req.body);
    res.status(status).send(data);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la modification de l'utilisateur.",
      err,
    });
  }
}

async function deleteOneUser(req, res) {
  try {
    const userId = req.params.id;

    const { status, data } = await users.delete({
      where: {
        id: parseInt(userId),
      },  
    });
    res.status(200).json({ message: "L'utilisateur a été supprimé avec succès."});

  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la supression de l'utilisateur.",
      err,
    });
  }
}

module.exports = {
  getUsers,
  createUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
};
