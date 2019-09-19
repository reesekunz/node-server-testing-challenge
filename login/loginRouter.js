const express = require("express");

const Users = require("../helpers/usersModel");
const bcrypt = require("bcryptjs");
// const db = require("../data/dbConfig");
const generateToken = require("../middleware/generateToken");

const router = express.Router();

// POST to 5000/api/login
router.post("/", (request, response) => {
  let { username, password } = request.body;
  //   console.log("POST login request", request);
  //   console.log("POST login request body", request.body);

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        console.log("token", token);
        response.status(200).json({ token });
      } else {
        // dont send 404 status because dont want them guessing credentials
        response.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      response.status(500).json(error);
    });
});

module.exports = router;
