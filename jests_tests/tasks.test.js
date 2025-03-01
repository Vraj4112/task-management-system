require("../config/env-config");

const request = require("supertest");
const app = require("../config/app-config");
const { sequelize } = require("../src/database/connect");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

let authToken;

beforeEach(async () => {
  await request(app).post("/api/auth/register").send({
    name: "taskuser",
    email: "taskuser@example.com",
    password: "password123",
    role: "USER",
  });

  const loginResponse = await request(app).post("/api/auth/login").send({
    email: "taskuser@example.com",
    password: "password123",
  });

  authToken = loginResponse.body.token;
});

describe("Task Management API", () => {
  it("should create a new task successfully", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Test Task",
        description: "This is a test task",
        dueDate: "2025-03-01",
        priority: "High",
      });
    console.log(response);
    expect(response.status).toBe(201); // HTTP 201: Created
    expect(response.body.mainTask).toHaveProperty("id");
    expect(response.body.mainTask).toHaveProperty("title", "Test Task");
    expect(response.body.mainTask).toHaveProperty("priority", "High");
  });

  it("should fail to create a task without authentication", async () => {
    const response = await request(app).post("/api/tasks").send({
      title: "Unauthorized Task",
      description: "This should fail",
    });

    expect(response.status).toBe(401); // HTTP 401: Unauthorized
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized access, token missing"
    );
  });
});
