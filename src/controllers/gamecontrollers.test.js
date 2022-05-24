const Game = require("../database/models/Game");
const gamesMock = require("../mocks/gamesMock");
const { getGames, getGame } = require("./gameControllers");

const next = jest.fn();

describe("Given a getGames controller", () => {
  describe("When invoked", () => {
    test("Then it should call the response's status method with 200, and json with a list of games", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Game.find = jest.fn().mockResolvedValue(gamesMock);

      await getGames(null, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(gamesMock);
    });
  });
  describe("When its invoked and there are no games in the database", () => {
    test("Then it should call the received next function", async () => {
      Game.find = jest.fn().mockResolvedValue([]);

      await getGames(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a getGame controller", () => {
  describe("When invoked with a request with the id of the first game in gamesMock", () => {
    test("Then it should call the response's status method with 200, and json with the game first game in gamesMock", async () => {
      const req = {
        params: { id: gamesMock[0].id },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Game.findById = jest.fn().mockResolvedValue(gamesMock[0]);

      await getGame(req, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(gamesMock[0]);
    });
  });
  describe("When its invoked with a non existent id", () => {
    test("Then it should call the received next function", async () => {
      const req = {
        params: { id: "wrongid" },
      };

      Game.findById = jest.fn().mockRejectedValue(new Error("Game not found"));

      await getGames(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
