const Users = require("./usersModel");
const db = require("../data/dbConfig");
require("dotenv").config();

describe("usersModel", () => {
  // beforeEach cleans up the table, resets the database with truncate()
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should set environment to testing", () => {
    // expect(process.env.DB_ENV).toBe("production"); --- make test fail first
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("add()", () => {
    it("should add users into the db", async () => {
      // insert a record
      await Users.add({ username: "Bob", password: "tacos" });

      let users = await db("users");

      // assert (check) the record was inserted
      //   expect(users).toHaveLength(0); -- make test fail
      expect(users).toHaveLength(1);
    });

    it("should add a user into the db", async () => {
      // insert a record (user)
      const { id } = await Users.add({ username: "Sam", password: "hi" });
      console.log("id", id);
      let user = await db("users")
        .where({ id })
        .first();
      console.log(user);

      // assert (check) the record was inserted
      //   expect(user.name).toBe("Jim"); -- make test fail
      expect(user.username).toBe("Sam");
    });
  });
});

// DB_ENV is from this script in package.json =>
// "test": "cross-env DB_ENV=testing jest --watch",
// and this in dbConfig =>
// const environment = process.env.DB_ENV || 'development'
// using this to grab testing configuration from knexfile.js
