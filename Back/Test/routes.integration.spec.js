const request = require("supertest");
const app = require("../src/app")
// const connection = require("../db");

describe("Test routes users", () => {
  //   beforeEach(async () => {
  //     try {
  //       const results = await connection.promise().query("SELECT * FROM wine");
  //       global.testMessages = results[0];
  //     } catch (error) {
  //       throw error;
  //     }
  //   });

  it("GET /users", async () => {
    try {
      const response = await request(app)
        .get("/users")
        .expect(200)
        .expect("Content-Type", /json/);
      expect(response.body).toEqual(global.testMessages);
    } catch (error) {
      throw error;
    }
  });
}, 10000);
