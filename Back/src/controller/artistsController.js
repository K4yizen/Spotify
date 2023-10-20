const { artists } = require("../../prisma/client")


async function createArtist(req, res) {
  const { name, artistCover, userId } = req.body;

  try {
    const newArtist = await artists.create({
      data: {
        name: name,
        artistCover: artistCover,
        users: {
          connect: { id: userId}
        }
      }
    });

    res.status(201).json(newArtist);
  } catch (err) {
    console.error("Erreur lors de la création de l'artiste :", err);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la création de l'artiste.",
    });
  }
}

async function getArtists(req, res) {
    try {
      const artistsList = await artists.findMany();
      res.status(201).json(artistsList);
    } catch (err) {
      console.error("Erreur lors de la création de l'utilisateur :", err);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la création de l'utilisateur.",
      });
    }
  }

async function getOneArtist(req, res) {
    try {
      const theArtists = await artists.findUnique({
        where: {
          userId: parseInt(req.params.id), 
        },
      });
      res.status(201).json(theArtists);
    } catch (err) {
      console.error("Erreur lors de la création de l'utilisateur :", err);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la création de l'utilisateur.",
      });
    }
  }

module.exports =  { createArtist, getOneArtist, getArtists } 