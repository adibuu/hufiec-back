const app = require("../app");
const request = require("supertest");

describe("infoModal", () => {
  it("return status code 200", async () => {
    const res = await request(app).get("/infoModal");

    expect(res.statusCode).toEqual(200);
  });
});
