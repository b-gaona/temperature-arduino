const express = require("express");

const dataRouter = require("./data/data.router");
const eventRouter = require("./events/events.router");
const userRouter = require("./user/user.router");
const serverRouter = require("./server/server.router");

const api = express.Router();

api.use("/data", dataRouter);
api.use("/events", eventRouter);
api.use("/users", userRouter);
api.use("/servers", serverRouter);

module.exports = api;
