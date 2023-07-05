const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const httpToHttps = require('express-http-to-https');

const path = require("path");

const api = require("./routes/api");
const { getCurrent } = require("./models/data.model");

const app = express();

// Enable HTTP to HTTPS redirection
app.use(httpToHttps.redirect());

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("combined"));

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
