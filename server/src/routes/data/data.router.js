const express = require("express");

const {
  httpGetAllData,
  httpAddData,
  httpGetCurrentData,
} = require("./data.controller");

const dataRouter = express.Router();

dataRouter.get("/", httpGetAllData);
dataRouter.get("/add", httpAddData);
dataRouter.get("/current", httpGetCurrentData);

module.exports = dataRouter;
