const app = require("../app");
const request = require("supertest");
const Gallery = require("../models/gallery");

afterEach(async () => {
  await Gallery.deleteMany();
});

describe("gallery", () => {
  it("return status code 404, when dont find any data", async () => {
    const res = await request(app).get("/gallery");

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe("Could not find gallery data!");
  });

  it("return data", async () => {
    const gallery = await Gallery.create({
      galleryURL: "www.google.pl",
    });

    const res = await request(app).get("/gallery");

    expect(res.statusCode).toEqual(200);
    expect(res.body[0].galleryURL).toBe(gallery.galleryURL);
  });
});
