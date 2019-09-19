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

// GET to 5000/api/users/2
router.get("/:id", (request, response) => {
  const { id } = request.params;

  Users.findById(id)
    .then(user => {
      if (user) {
        response.json(user);
      } else {
        response
          .status(404)
          .json({ message: "Could not find user with given id." });
      }
    })
    .catch(error => {
      response.status(500).json({ message: "Failed to get user" });
    });
});

// DELETE to 5000/api/users

router.delete("/:id", (request, response) => {
  const { id } = request.params;

  Users.remove(id)
    .then(deletedUser => {
      if (deletedUser) {
        response.json({ removed: deletedUser });
      } else {
        response
          .status(404)
          .json({ message: "Could not find user with given id" });
      }
    })
    .catch(error => {
      response.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;
