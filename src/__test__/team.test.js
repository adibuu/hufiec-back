const app = require("../app");
const request = require("supertest");
const Team = require("../models/team");

afterEach(async () => {
  await Team.deleteMany();
});

describe("teams", () => {
  it("return status code 404, when dont find any data", async () => {
    const res = await request(app).get("/teams");

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe("Could not find teams");
  });

  it("return all teams", async () => {
    const team1 = await Team.create({
      name: "Team 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sodales congue tortor in malesuada.",
    });

    const team2 = await Team.create({
      name: "Team 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sodales congue tortor in malesuada.",
    });

    const res = await request(app).get("/teams");

    expect(res.statusCode).toEqual(200);
    expect(res.body[0].name).toBe(team1.name);
    expect(res.body[0].description).toBe(team1.description);

    expect(res.body[1].name).toBe(team2.name);
    expect(res.body[1].description).toBe(team2.description);
  });

  it("return single team", async () => {
    const team = await Team.create({
      name: "Team",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sodales congue tortor in malesuada.",
    });

    const res = await request(app).get("/teams/" + team._id);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe(team.name);
    expect(res.body.description).toBe(team.description);
  });
});
