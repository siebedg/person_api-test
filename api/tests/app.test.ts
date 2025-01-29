import request from "supertest";
import app from "../src/app.js";

describe("PersonAPI", () => {
  it("should create a person", async () => {
    const res = await request(app)
      .post("/person")
      .send({ name: "Lisa", age: 23 });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Lisa");
    expect(res.body.age).toBe(23);
  });

  test("person should be at least 18 years old", async () => {
    const res = await request(app)
      .post("/person")
      .send({ name: "Paul", age: 17 });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Person must be at least 18 years old");
  });

  test("should return 400 if person with the same name already exists", async () => {
    await request(app).post("/person").send({ name: "Alice", age: 30 });

    const res = await request(app)
      .post("/person")
      .send({ name: "Alice", age: 25 });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Person with this name already exists");
  });

  test("should return 400 if name or age is missing", async () => {
    const res = await request(app).post("/person").send({ name: "Bob" });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Name and age are required");
  });

  test("should return a person by name", async () => {
    await request(app).post("/person").send({ name: "Charlie", age: 40 });

    const res = await request(app).get("/person/Charlie");

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Charlie");
  });

  test("should return 404 if person not found", async () => {
    const res = await request(app).get("/person/Unknown");

    expect(res.status).toBe(404);
    expect(res.text).toBe("Person not found");
  });
});
