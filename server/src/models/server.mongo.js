const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  server: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("Server", serverSchema); //The serverSchema is assigned to the User model
