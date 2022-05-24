const Game = require("../database/models/Game");
const gamesMock = require("../mocks/gamesMock");
const { getGames } = require("./gameControllers");

describe("Given a getGame controller", () => {
  describe("When invoked", () => {
    test("Then call the response's status method with 200, and json with a list of games", async () => {
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
      const next = jest.fn();
      Game.find = jest.fn().mockResolvedValue([]);

      await getGames(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
