const app = require("../app");
const request = require("supertest");

describe("posts", () => {
  it("return status code 200", async () => {
    const res = await request(app).get("/posts");

    expect(res.statusCode).toEqual(200);
  });
});
