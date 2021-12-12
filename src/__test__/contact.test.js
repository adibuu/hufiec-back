const app = require("../app");
const request = require("supertest");
const Contact = require("../models/contact");

afterEach(async () => {
  await Contact.deleteMany();
});

describe("contact", () => {
  it("return status code 404, when dont find any data", async () => {
    const res = await request(app).get("/contact");

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe("Could not find contact data!");
  });

  it("return data", async () => {
    const contact = await Contact.create({
      email: "test@test.pl",
      phone: "555 777 888",
      address: {
        city: "Rypin",
        street: "Testowa",
        postCode: "87-500",
      },
    });

    const res = await request(app).get("/contact");

    expect(res.statusCode).toEqual(200);
    expect(res.body[0]._id).toBe(contact.id);
    expect(res.body[0].email).toBe(contact.email);
    expect(res.body[0].phone).toBe(contact.phone);
    expect(res.body[0].address.city).toBe(contact.address.city);
    expect(res.body[0].address.street).toBe(contact.address.street);
    expect(res.body[0].address.postCode).toBe(contact.address.postCode);
  });
});
