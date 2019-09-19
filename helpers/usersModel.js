const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove
};

function find() {
  return db("users").select(
    "id",
    "username"
    //   "password" - dont want to select password since dont want to display a users password
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

function remove(id) {
  return db("users")
    .where({ id: id })
    .del();
}
