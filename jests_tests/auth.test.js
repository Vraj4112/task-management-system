require("../config/env-config");

const request = require("supertest");
const app = require("../config/app-config");
const { sequelize } = require("../src/database/connect");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("User Registration API", () => {
  it("should register a new user successfully", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "testuser",
      email: "testuser@example.com",
      password: "password123",
      role: "USER",
    });

    expect(response.status).toBe(201); // HTTP 201: Created
    expect(response.body).toHaveProperty(
      "message",
      "User registered successfully"
    );
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("email", "testuser@example.com");
  });

  it("should fail if the email is already registered", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "testuser",
      email: "testuser@example.com",
      password: "password123",
      role: "USER",
    });

    expect(response.status).toBe(400); // HTTP 400: Bad Request
    expect(response.body).toHaveProperty(
      "message",
      "user with this email already exists"
    );
  });
});
