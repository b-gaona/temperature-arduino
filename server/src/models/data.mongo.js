const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  temperatura: {
    type: Number,
    required: true,
  },
  indice_calor: {
    type: Number,
    required: true,
  },
  humedad: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  seccion: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Data", dataSchema);
