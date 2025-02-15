const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../index");
const Todo = require("../models/Todo");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

let mongoServer;
let token;

beforeEach(async () => {
  await Todo.deleteMany({});
  await User.deleteMany({});

  const user = await User.create({
    username: "testuser",
    password: "password123",
  });

  token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "1h" }
  );
});

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  // Créer un utilisateur de test et générer un token
  const user = await User.create({
    username: "testuser",
    password: "password123",
  });

  token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "1h" }
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Todo.deleteMany({});
});

describe("Todo API", () => {
  describe("GET /api/todos", () => {
    it("should return all todos", async () => {
      await Todo.create({ title: "Test todo" });

      const res = await request(app)
        .get("/api/todos")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe("Test todo");
    });
  });

  describe("POST /api/todos", () => {
    it("should create a new todo", async () => {
      const res = await request(app)
        .post("/api/todos")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "New todo" });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe("New todo");
      expect(res.body.completed).toBe(false);

      const todo = await Todo.findById(res.body._id);
      expect(todo).toBeTruthy();
      expect(todo.title).toBe("New todo");
    });

    it("should validate todo input", async () => {
      const res = await request(app)
        .post("/api/todos")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "" });

      expect(res.status).toBe(400);
    });
  });
});
