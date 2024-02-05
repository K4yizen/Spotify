const helper = require("../../services/passwordHelper");
const { jwtGenerator } = require("../../services/loginHelper");
const { getUserByEmail, getUserById } = require('../model/userManager'); // Assurez-vous de spécifier le bon chemin

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Utiliser findByEmail pour rechercher l'utilisateur par e-mail
      const userResult = await getUserByEmail(email);
  
      if (userResult.status !== 200) {
        return res.sendStatus(userResult.status);
      }
  
      const user = userResult.data;
  
      // Vérifier si le mot de passe est correct
      const passwordMatch = await helper.verifyPassword(user.password, password);
  
      if (!passwordMatch) {
        console.warn("titi", password);
        console.warn("otot", user.password);
        return res.status(401).json("Email or password is wrong");
      }
  
      // Générer un token JWT
      const token = jwtGenerator(user.id);
      console.warn(token);
  
      // Utiliser getUserById au lieu de findUnique
      const getUserResult = await getUserById(user.id);
  
      if (getUserResult.status !== 200) {
        return res.sendStatus(getUserResult.status);
      }
  
      // Récupérer les données de l'utilisateur sans le mot de passe
      const userData = getUserResult.data;
      delete userData.password;
      console.log(userData);
  
      // Retourner les cookies et les données utilisateur
      return res
      .cookie("token", token, {
        httpOnly: true,
      })
      .cookie("user", userData, {
        httpOnly: false,
      })
      .status(200)
      .json({ message: "Login successful" });
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  };

// Fonction de déconnexion (commentée car elle n'est pas utilisée dans ce code)
// async function logoutController(req, res) {
//   return res.clearCookie("token").status(200).json("Successfully logged out");
// }

module.exports = { login };
