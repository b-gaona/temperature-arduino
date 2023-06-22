const express = require("express");

const {
  httpGetAllUsers,
  httpAddUser,
  httpDeleteUserById,
  httpUpdateUserById,
  httpVerifyUser,
} = require("./user.controller");

const userRouter = express.Router();

userRouter.get("/", httpGetAllUsers);

userRouter.post("/add", httpAddUser);

userRouter.put("/update/:id", httpUpdateUserById);

userRouter.delete("/delete/:id", httpDeleteUserById);

userRouter.post("/verify", httpVerifyUser);

module.exports = userRouter;
