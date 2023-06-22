const {
  getAllData,
  saveData,
  getCurrentData,
} = require("../../models/data.model");
const { getPagination } = require("../../services/query");

async function httpGetAllData(req, res) {
  const { skip, limit } = getPagination(req.query); // To read the body of the GET request we use req.query
  const data = await getAllData({ skip, limit });
  return res.status(200).json(data);
}

async function httpAddData(req, res) {
  const { temperatura, humedad, indice_calor, seccion } = req.query; // To read the body of the GET request we use req.query
  if (
    !temperatura ||
    isNaN(temperatura) ||
    !humedad ||
    isNaN(humedad) ||
    !indice_calor ||
    isNaN(indice_calor) ||
    !seccion
  ) {
    return res.status(400).json({
      error:
        "Datos no válidos - temperatura - humedad - indice_calor son necesarios.",
    });
  }
  const object = {
    temperatura,
    humedad,
    indice_calor,
    seccion,
    fecha: new Date(),
  };

  const data = await saveData(object);
  return res.status(200).json(data);
}

async function httpGetCurrentData(req, res) {
  const data = await getCurrentData();
  return res.status(200).json(data);
}

module.exports = {
  httpGetAllData,
  httpAddData,
  httpGetCurrentData,
};
