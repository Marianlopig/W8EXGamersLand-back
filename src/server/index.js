const express = require("express");
const userRouter = require("../routers/userRouter");

const app = express();

app.use("/user", userRouter);

module.exports = app;
