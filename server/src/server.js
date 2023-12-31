const http = require("http");

require("dotenv").config(); //To able the configurations in the .env file

const app = require("./app");

const { mongoConnect } = require("./services/mongo");

const Server = require("./models/server.mongo");
const axios = require ("axios");

async function checkServerAvailability() {
  try {
    const servers = await Server.find({});
    console.log(servers);
    for (const { server, estado } of servers) {
      console.log(`Checking server: ${server}`);

      try {
        const res = await axios.get(server);

        if (res.data) {
          if (estado === "Apagado") {
            await Server.findOneAndUpdate(
              { server },
              { $set: { estado: "Encendido" } }
            );
          }
          console.log(`Server ${server} is available`);
        } else {
          if (estado === "Encendido") {
            await Server.findOneAndUpdate(
              { server },
              { $set: { estado: "Apagado" } }
            );
          }
          console.log(`Server ${server} is not available`);
        }
      } catch (error) {
        if (estado === "Encendido") {
          await Server.findOneAndUpdate(
            { server },
            { $set: { estado: "Apagado" } }
          );
        }
        console.log(`Error occurred while checking server ${server}: ${error}`);
        console.log(`Server ${server} is not available`);
      }
    }
  } catch (error) {
    console.log("Error occurred:", error);
  }
}

const PORT = process.env.PORT || 8000; //To avoid conflict with the 3000 that's using React
const IP_ADDRESS = process.env.IP_ADDRESS || "localhost";

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  console.log(`${process.env.IP_ADDRESS}:${process.env.PORT}`);

  if (IP_ADDRESS === "192.168.137.1") {
    server.listen(PORT, () => {
      console.log(`Server listening on ${process.env.IP_ADDRESS}:${PORT}`);
    });
  } else {
    server.listen(PORT, () => {
      const address = server.address();
      console.log(`Server listening on ${address.address}:${PORT}`);
    });
  }

  // Schedule pings every minute
  //setInterval(doFetchToServers, 10000);

  setInterval(async () => {
    await checkServerAvailability();
  }, 5000);
}

startServer();
