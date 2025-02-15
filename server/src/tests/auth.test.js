const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../index");
const User = require("../models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("Auth API", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "testuser",
        password: "password123",
      });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("User created successfully");

      const user = await User.findOne({ username: "testuser" });
      expect(user).toBeTruthy();
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login existing user", async () => {
      // Créer un utilisateur
      await request(app).post("/api/auth/register").send({
        username: "testuser",
        password: "password123",
      });

      // Tester le login
      const res = await request(app).post("/api/auth/login").send({
        username: "testuser",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
  });
});
