const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const path = require("path");

const api = require("./routes/api");
const { getCurrent } = require("./models/data.model");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("combined"));

app.use(express.json());

//app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", api);

app.use("/", (req, res) => {
  return res.status(200).json({ message: "success" });
});

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

module.exports = app;
