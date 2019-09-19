const request = require("supertest");

const server = require("./server");

describe("server.js", () => {
  describe("GET /", () => {
    it("returns 200 status to show api is up", () => {
      // make a GET request to the / endpoint on the server
      // method 1 - returning
      // need to return so JEST knows its a promise (needs to wait for result) - otherwise test would return false positive
      return request(server)
        .get("/")
        .then(response => {
          // assert (check) that we get an http status code 200
          //   expect(response.status).toBe(500); -- make tests fail first
          expect(response.status).toBe(200);
        });
    });

    it("should return { api: 'it is alive!' }", async () => {
      // method 2 - async and await

      const response = await request(server).get("/");
      //   expect(response.body.api).toBe("it is dead");
      //   expect(response.body).toEqual({ api: "it is dead" }); -- make tests fail first
      expect(response.body.api).toBe("it is alive!");
      // same as
      expect(response.body).toEqual({ api: "it is alive!" });
    });
  });

  // method 3
  it("returns JSON", done => {
    request(server)
      .get("/")
      .then(response => {
        //   expect(response.type).toMatch(/xml/i); - make it fail first
        expect(response.type).toMatch(/json/i);
        done();
      });
  });
});
