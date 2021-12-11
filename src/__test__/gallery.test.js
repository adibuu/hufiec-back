const app = require("../app");
const request = require("supertest");

describe("gallery", () => {
  it("return status code 200", async () => {
    const res = await request(app).get("/gallery");

    expect(res.statusCode).toEqual(200);
  });
});
