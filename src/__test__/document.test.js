const app = require("../app");
const request = require("supertest");
const Document = require("../models/document");

afterEach(async () => {
  await Document.deleteMany();
});

describe("document", () => {
  it("return status code 404, when dont find any data", async () => {
    const res = await request(app).get("/document");

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe("Could not find documents data!");
  });

  it("return data", async () => {
    const document = await Document.create({
      documentsURL: "www.google.pl",
    });

    const res = await request(app).get("/document");

    expect(res.statusCode).toEqual(200);
    expect(res.body[0].documentsURL).toBe(document.documentsURL);
  });
});
