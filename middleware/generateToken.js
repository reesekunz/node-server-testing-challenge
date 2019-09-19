const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
    // department: user.department - didnt use deparment in migrations for this project
  };

  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
  // payload is the data
  // secrets is the name of the var we declared on the import, jwtSecret is what we are grabbing from that secrets file
  // options is where we are determining the expiration time
};
