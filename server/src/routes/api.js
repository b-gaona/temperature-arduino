const express = require("express");

const dataRouter = require("./data/data.router");
const eventRouter = require("./events/events.router");
const usertRouter = require("./user/user.router");

const api = express.Router();

api.use("/data", dataRouter);
api.use("/events", eventRouter);
api.use("/users", usertRouter);

module.exports = api;
