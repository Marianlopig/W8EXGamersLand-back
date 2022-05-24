const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const userRouter = require("../routers/userRouter");
const gamesRouter = require("../routers/gamesRouter");
const { notFoundError, generalError } = require("./middlewares/errors");
const auth = require("./middlewares/auth/auth");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/user", userRouter);
app.use("/games", auth, gamesRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
