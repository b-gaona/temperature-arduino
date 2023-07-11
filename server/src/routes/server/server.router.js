const express = require("express");

const {
  httpGetAllServers,
  httpAddServer,
  httpDeleteServerById,
  httpUpdateServerById,
} = require("./server.controller");

const serverRouter = express.Router();

serverRouter.get("/", httpGetAllServers);

serverRouter.post("/add", httpAddServer);

serverRouter.put("/update/:id", httpUpdateServerById);

serverRouter.delete("/delete/:id", httpDeleteServerById);

module.exports = serverRouter;
