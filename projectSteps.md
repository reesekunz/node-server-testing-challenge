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

<!-- PHASE 3 - CREATING MIGRATIONS -->

#14. knex init
creates a knexfile.js

#15. Update knexfile.js to match config settings
module.exports = {
development: {
client: "sqlite3",
useNullAsDefault: true,
connection: {
filename: "./data/auth.db3"
},
pool: {
afterCreate: (conn, done) => {
conn.run("PRAGMA foreign_keys = ON", done);
}
},
migrations: {
directory: "./data/migrations"
},
seeds: {
directory: "./data/seeds"
}
}
};

#16. knex migrate:make users-table
should make a data folder with users-table migrations inside

#17. Add and build out dbConfig.js file inside the data folder
const knex = require("knex");
const knexConfig = require("../knexfile.js");
module.exports = knex(knexConfig.development);

#18. Plan out your tables in the data model, specifically how the foreign keys/primary keys and each table is connected with each other (if they are)

#19. Build out migrations tables to match data model and requirements

#20. knex migrate:latest
should create an auth.db3 file and run migrations

<!-- PHASE 4 - CREATING SEEDS -->
<!-- *** These notes are from a previous project as I wont be implementing seeds in this project -->

# npx knex seed:make 00-cleanup

# Create and build out cleanup file

npm i knex-cleaner

# Create seeds and match the names with tables created in migrations/data model

npx knex seed:make 01-recipes
npx knex seed:make 02-ingredients
npx knex seed:make 03-recipe_ingredients
npx knex seed:make 04-recipe_steps

# Build out recipe seeds

(Make sure the seed data aligns with what you created in migrations table and data model)

# Build out ingredients seeds

# Build out recipe_ingredients seeds

# Build out recipe_steps seeds

# Run creted seed files

#knex seed:run
(may need to knex migrate:rollback and knex migrate:latest again for migrations if made any changes)

<!-- PHASE 5 - CREATING HELPERS AND ROUTERS -->

#21. Create a register folder
inside register folder => registerRouter.js

#22. Create a login folder
inside login folder => loginRouter.js

#23. Create a users folder
inside users folder => usersRouter.js

(Note that since theres only one database migration ("users") that we will be referencing for each router, the helpers will go in one individual file. If (for example) referencing separate "register", "login", and "users" tables instead, would add to each respective folder (registerHelpers.js, loginHelpers.js, usersHelpers.js etc.)

#24. Create a build out a usersModel inside of a helpers folder
(import this into each router)

const db = require("../data/dbConfig");

module.exports = {
add,
find,
findBy,
findById
};

function find() {
return db("users").select(
"id",
"username"
// "password" - dont want to select password since dont want to display a users password
// "department" - not using deparment for migrations in this project
);
}

function findBy(filter) {
return db("users").where(filter);
}

function add(user) {
return db("users")
.insert(user, "id")
.then(ids => {
const [id] = ids;
return findById(id);
});
}

function findById(id) {
return db("users")
.where({ id })
.first();
}

#25. Build out and test registerRouter.js
(remember to uncomment out route in server)

Test POST to 5000/api/register:

{
"username": "Reese",
"password": "password"
}

Should return:
{
"id": 1,
"username": "Reese",
"password": "$2a$14\$qtIrA0GebOTTJDMI/Cre/uFXzL7xrP6VqcIy.VR67OiPkuoEE8y2W"
}

#26. npm i jsonwebtoken

#27. Create config folder
inside config folder => secrets.js

#28. Build out secrets.js

- secrets will be imported into generateToken and restrictedMiddleware (creating in next steps)

module.exports = {
jwtSecret: process.env.JWT_SECRET || "keep it secret, keep it safe!"
};

#26. Add a middleware folder
inside middleware folder => generateToken.js and restrictedMiddleware.js

#27. Build out generateToken.js
import generateToken into loginRouter

#28. Build out restrictedMiddleware.js

#29. Build out and test loginRouter.js
(remember to uncomment out route in server)

Test POST to 5000/api/login:

{
"username": "Reese",
"password": "password"
}

Should return:
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiUmVlc2UiLCJpYXQiOjE1Njg5MjQ2NTQsImV4cCI6MTU2OTAxMTA1NH0.XSvSzS-n6oeNWLY3S6XEYA9wxe0Ps5dMWQLFtl_ky9g"
}

#30. Build out and test usersRouter.js
(remember to uncomment out route in server)

on Postman set the token you recieve (without the "") as the header for your GET request

should look like:

KEY VALUE

---

Content-Type application/json
Authorization eyJh6ciO.... etc.

Test GET to 5000/api/users:

Should now return:

{
"users": [
{
"id": 1,
"username": "Reese"
}
],
"loggedInUser": "Reese"
}

(also if you dont set your headers, it should return "no credentials provided" so a non-logged in user can not view it)

<!-- PHASE 6 - TESTING -->

#31. Added a remove helper to the userModel, and GET api/users/:id and DELETE api/users/:id functionality to usersRouter

#32. npm i -D supertest jest

#33. make sure package.json looks like this:
"scripts": {
"server": "nodemon index.js",
"test": "cross-env DB_ENV=testing jest --watch"
"start": "node index.js"
},

Example from training kit:

<!-- "test": "jest --watch --verbose"  -->
<!-- And also make sure it contains this:

"jest": {
"testEnvirnoment": "node"
} -->

#34. add testing files
usersModel.spec.js
loginRouter.spec.js
usersRouter.spec.js
registerRouter.spec.js
server.spec.js

#35. update knexfile.js to include testing
testing: {
client: "sqlite3",
connection: {
filename: "./data/test.db3"
},
useNullAsDefault: true,
migrations: {
directory: "./data/migrations"
},
seeds: {
directory: "./data/seeds"
}
}

#36. npx jest -- init
Creates a jest.config.js file and sets testEnvironment to be Node - can make sure this is uncommented in jestconfig

#37. npm test
(should now be running failing tests)

#38. Build out server.spec.js tests

#39. Update dbConfig to set environment to testing
const knex = require("knex");
const config = require("../knexfile.js");

const environment = process.env.DB_ENV || "development";

module.exports = knex(config[environment]);
// module.exports = knex(config.development);

#40. knex migrate:latest --env=testing

#41. build out userModel.spec.js
