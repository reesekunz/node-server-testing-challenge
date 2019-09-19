const express = require("express");

// const usersRouter = require("./users/usersRouter");
// const registerRouter = require("./register/registerRouter");
// const loginRouter = require("./login/loginRouter");

const server = express();

server.use(express.json());

// server.use("/api/users", usersRouter);
// server.use("/api/register", registerRouter);
// server.use("/api/login", loginRouter);

server.get("/", (request, response) => {
  response.send("It's alive!");
});

module.exports = server;
