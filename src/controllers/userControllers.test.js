const { userRegister } = require("./userControllers");
const bcrypt = require("bcrypt");
const User = require("../database/models/User");

const mockNewUser = {
  name: "Silvi",
  username: "silvi",
  password: "11111",
  _id: "sdjdksfwe54",
};

jest.mock("../database/models/User", () => ({
  findOne: jest.fn(),
  create: jest.fn(() => mockNewUser),
}));

jest.mock("bcrypt", () => ({ hash: jest.fn() }));

describe("Given a register user function", () => {
  describe("When it is called on", () => {
    test("Then it should call the response method with a status 201 and the name created user", async () => {
      const req = {
        body: { name: "Silvi", username: "silvi", password: "11111" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedStatus = 201;
      const expectedJson = { name: "Silvi" };
      bcrypt.hash.mockImplementation(() => "hashedPassword");
      await userRegister(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
    describe("When it is called with a user that is already in the database", () => {
      test("Then it should call the 'next' middleware with an error", async () => {
        const req = {
          body: { name: "Paco", username: "paco", password: "paco1" },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        const mockNext = jest.fn();

        User.findOne.mockImplementation(() => true);

        await userRegister(req, res, mockNext);
        const expectedError = new Error();
        expectedError.code = 409;
        expectedError.message = "This user already exists...";
        expect(mockNext).toHaveBeenCalledWith(expectedError);
      });
    });
  });
});
