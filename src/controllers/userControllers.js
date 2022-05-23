require("dotenv").config();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../database/models/User");
const customError = require("../utils/customError");

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    const error = customError(403, "Bad request", "User or password incorrect");
    next(error);
  }
  const userData = {
    username: user.username,
    name: user.name,
  };

  const rightPassword = await bcrypt.compare(password, user.password);
  if (!rightPassword) {
    const error = customError(403, "Bad request", "User or password incorrect");

    next(error);
  }
  const token = jsonwebtoken.sign(userData, process.env.JWT_SECRET);

  res.status(201).json({ token });
};

const userRegister = async (req, res, next) => {
  const { name, username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    const error = new Error();
    error.code = 409;
    error.message = "This user already exists...";

    next(error);
  }
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, username, password: encryptedPassword };

    const createdUser = await User.create(newUser);

    res.status(201).json({ name });
  } catch (error) {
    error.code = 400;
    error.message = "Wrong user data..";
    next(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
};
