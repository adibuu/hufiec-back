const app = require("../app");
const request = require("supertest");
const InfoModal = require("../models/infoModal");

afterEach(async () => {
  await InfoModal.deleteMany();
});

describe("infoModal", () => {
  it("return status code 404, when dont find any data", async () => {
    const res = await request(app).get("/infoModal");

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe("Could not find InfoModal data!");
  });

  it("return data", async () => {
    const infoModal = await InfoModal.create({
      content: "test info modal",
    });

    const res = await request(app).get("/infoModal");

    expect(res.statusCode).toEqual(200);
    expect(res.body[0].content).toBe(infoModal.content);
  });

  it("return show modal: false", async () => {
    const infoModal = await InfoModal.create({
      content: "test info modal",
      show: false,
    });

    const res = await request(app).get("/infoModal");

    expect(res.statusCode).toEqual(200);
    expect(res.body[0].show).toBe(infoModal.show);
  });

  it("return show modal: true", async () => {
    const infoModal = await InfoModal.create({
      content: "test info modal",
      show: true,
    });

    const res = await request(app).get("/infoModal");

    expect(res.statusCode).toEqual(200);
    expect(res.body[0].show).toBe(infoModal.show);
  });
});
