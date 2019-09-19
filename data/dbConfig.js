const knex = require("knex");
const config = require("../knexfile");

console.log(process.env.DB_ENV);
const environment = process.env.DB_ENV || "development";

module.exports = knex(config[environment]);
// module.exports = knex(config.development);
