const express = require("express");
const { validate } = require("express-validation");
const { getGames } = require("../controllers/gameControllers");
const { userLogin, userRegister } = require("../controllers/userControllers");
const {
  credentialsLoginSchema,
  credentialsRegisterSchema,
} = require("../schemas/userCredentials");
const auth = require("../server/middlewares/auth/auth");

const userRouter = express.Router();

userRouter.post("/login", validate(credentialsLoginSchema), userLogin);
userRouter.post("/register", validate(credentialsRegisterSchema), userRegister);
userRouter.get("/games", auth, getGames);

module.exports = userRouter;
