const express = require("express");
const { getGames } = require("../controllers/gameControllers");
const { userLogin, userRegister } = require("../controllers/userControllers");
const auth = require("../server/middlewares/auth/auth");

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.get("/games", auth, getGames);
module.exports = userRouter;
