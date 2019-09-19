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
