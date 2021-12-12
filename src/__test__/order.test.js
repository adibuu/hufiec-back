const app = require("../app");
const request = require("supertest");

describe("order", () => {
  it("return status code 400, when no orderDate / orderNumber / town / troopsName data was sent", async () => {
    const res = await request(app).post("/order").send();

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe(
      "Cannot create order pdf without one of this data: date, order number, town, troops name."
    );
  });

  it("return pdf document", async () => {
    await request(app)
      .post("/order")
      .send({
        orderDate: "2021-12-07",
        orderNumber: "8",
        town: "Rypin",
        troopsName: "Test",
      })
      .expect("Content-type", "application/pdf")
      .expect(200);
  });
});
