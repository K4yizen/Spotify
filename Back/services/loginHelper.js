const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("jwtRS256.key");

function jwtGenerator(id) {
  return jwt.sign({ userId: id }, privateKey, {
    algorithm: "RS256",
  });
}

module.exports = { jwtGenerator };
