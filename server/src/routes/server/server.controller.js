const {
  getAllServers,
  saveServer,
  deleteServerById,
  updateServerById,
} = require("../../models/server.model");
const { getPagination } = require("../../services/query");

async function httpGetAllServers(req, res) {
  const { skip, limit } = getPagination(req.query); // To read the body of the GET request we use req.query
  const data = await getAllServers({ skip, limit });
  return res.status(200).json(data);
}

async function httpAddServer(req, res) {
  try {
    const server = req.body;
    const object = {
      ...server,
      fecha: new Date(),
    };

    console.log(object);
    await saveServer(object);
    return res.status(200).json(object);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ...error,
      message: "Maybe you entered the wrong object properties.",
    });
  }
}

async function httpDeleteServerById(req, res) {
  try {
    const { id } = req.params;
    const server = await deleteServerById(id);
    return res.status(200).json(server);
  } catch (error) {
    return res.status(404).json({
      ...error,
      message: `Sorry, we couldn't handle your request, try it later`,
    });
  }
}

async function httpUpdateServerById(req, res) {
  try {
    const { id } = req.params;
    const server = req.body;
    const object = {
      ...server,
      fecha: new Date(),
    };
    const newServer = await updateServerById(id, object);
    return res.status(200).json(newServer);
  } catch (error) {
    return res.status(404).json({
      ...error,
      message: `Sorry, we couldn't handle your request, try it later`,
    });
  }
}

module.exports = {
  httpGetAllServers,
  httpAddServer,
  httpDeleteServerById,
  httpUpdateServerById,
};
