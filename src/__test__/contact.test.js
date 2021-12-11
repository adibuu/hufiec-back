const app = require("../app");
const request = require("supertest");

describe("contact", () => {
  it("return status code 200", async () => {
    const res = await request(app).get("/contact");

    expect(res.statusCode).toEqual(200);
  });
});
