const express = require("express");

const Users = require("../helpers/usersModel");

const bcrypt = require("bcryptjs");
const db = require("../data/dbConfig");

const router = express.Router();

// POST to 5000/api/register
// 	Creates a user using the information sent inside the body of the request.
// Hash the password before saving the user to the database.
router.post("/", (request, response) => {
  let user = request.body;
  const hash = bcrypt.hashSync(user.password, 14); // 2 ^ 14
  user.password = hash;

  Users.add(user)
    .then(savedUser => {
      response.status(201).json(savedUser);
    })
    .catch(error => {
      response.status(500).json(error);
    });
});

module.exports = router;
