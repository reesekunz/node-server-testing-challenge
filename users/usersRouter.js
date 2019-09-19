const express = require("express");

const Users = require("../helpers/usersModel");
const restricted = require("../middleware/restrictedMiddleware");

const router = express.Router();
// GET to 5000/api/users
router.get("/", restricted, (request, response) => {
  Users.find()
    .then(users => {
      response.json({ users, loggedInUser: request.user.username });
    })
    .catch(error => response.send(error));
});

module.exports = router;
