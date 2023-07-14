const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  server: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
    default: "Encendido",
  },
});

module.exports = mongoose.model("Server", serverSchema); //The serverSchema is assigned to the User model
