<!-- PHASE 1 - Install Dependencies & Add Scripts -->

#1. npm i

#2. npm i express

#3. npm init -y
gives you package.json

#4. npx gitignore node

#5. npm add knex sqlite3

#6. npm i -D nodemon

#7. npm install bcrypt AND/OR npm i bcryptjs

#8. Add scripts to package.json (added test script as well)
"scripts": {
"server": "nodemon index.js",
"start": "node index.js",
"test": "jest --watch"
},

<!-- PHASE 2 - BUILD OUT INDEX AND SERVER, GET PORT RUNNING -->

#9. Add and build out server.js file
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

#10. Add and build out index.js file
const server = require("./server");

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Running on port ${port}`));

#11. killall node
This will terminate any existing ports being ran so that you can run on port 5000 again

#12. npm run server
Should return "running on port 5000" in terminal

#13. Sanity check - make GET request to localhost:5000 on Postman
Should return "its alive!"
