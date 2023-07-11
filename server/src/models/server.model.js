const Server = require("./server.mongo");

async function getAllServers({ skip, limit }) {
  return await Server.find(
    {},
    {
      __v: 0,
    }
  )
    .skip(skip) //The number of elements to skip
    .limit(limit); //The number of elements to show
}

async function saveServer(server) {
  return await Server.create(server);
}

async function deleteServerById(id) {
  return await Server.findByIdAndDelete(id);
}

async function updateServerById(id, server) {
  return await Server.findByIdAndUpdate({ _id: id }, server, { new: true });
}

module.exports = {
  getAllServers,
  saveServer,
  deleteServerById,
  updateServerById,
};
