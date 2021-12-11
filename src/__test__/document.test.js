const app = require("../app");
const request = require("supertest");
const Document = require("../models/document");

describe("document", () => {
  it("return status code 200", async () => {
    const res = await request(app).get("/document");

    expect(res.statusCode).toBe(200);
  });
});
