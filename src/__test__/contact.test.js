const app = require("../app");
const request = require("supertest");

describe("contact", () => {
  it("return status code 200 if everything is ok", async () => {
    const res = await request(app).get("/contact");

    expect(res.statusCode).toEqual(200);
  });

  it("return JSON", async () => {
    const res = await request(app).get("/contact");

    expect(res.type).toEqual("application/json");
  });

  it("return email", async () => {
    await request(app)
      .get("/contact")
      .expect(function (res) {
        res.body.email;
      });
  });
});
