const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const mockNewUser = require("../mocks/usersMock");
const connectDB = require("../database");
const app = require("../server/index");

const User = require("../database/models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await User.create(mockNewUser[0]);
  await User.create(mockNewUser[1]);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a POST/user/login endpoint", () => {
  describe("When it receives a request with a users present in the database", () => {
    test("Then it should respond with a 200 status and a token", async () => {
      const user = {
        name: "lelo",
        username: "lelo",
        password: "lelo",
      };

      bcrypt.compare = jest.fn().mockReturnValue(true);

      const {
        body: { token },
      } = await request(app).post("/users/login").send(user).expect(200);
      expect(token).not.toBeNull();
    });
  });

  describe("When it receives a request with a user not present in the database", () => {
    test("Then it should response with status error 403", async () => {
      const user = {
        name: "pablo",
        username: "Pablo",
        password: "escobar",
      };

      const { token } = await request(app)
        .post("/users/login")
        .send(user)
        .expect(403);

      expect(token).toBeUndefined();
    });
  });

  describe("When it receives a request with a user not present in the database", () => {
    test("Then it should response with status error 403", async () => {
      const user = {
        name: "lelo",
        username: "lelo",
        password: "dhjshdj",
      };

      bcrypt.compare = jest.fn().mockReturnValue(false);

      const { token } = await request(app)
        .post("/users/login")
        .send(user)
        .expect(403);

      expect(token).toBeUndefined();
    });
  });
});
