const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
// token verification
module.exports = (request, response, next) => {
  const token = request.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        // token expired or is invalid
        response.status(401).json({ message: "You shall not pass!" });
      } else {
        // token is valid
        request.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    response.status(400).json({ message: "no credentials provided" });
  }
};
