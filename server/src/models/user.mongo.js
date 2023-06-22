const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  clave: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema); //The userSchema is assigned to the User model
