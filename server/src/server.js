const http = require("http");

require("dotenv").config(); //To able the configurations in the .env file

const app = require("./app");

const { mongoConnect } = require("./services/mongo");
const { getAllServers } = require("./models/server.model");

const Server = require("./models/server.mongo");

async function doFetchToServers() {
  const servers = await getAllServers({ skip: 0, limit: 0 });
  servers.forEach(async ({ server }) => {
    try {
      console.log(`Fetch to ${server}\n`);
      const res = await fetch(server);
      console.log(`Status:${res.status}\n\n`);
      
      // if (res.status !== 200) {
      //   await Server.updateOne(
      //     {
      //       server,
      //     },
      //     { status: false },
      //     {
      //       upsert: true,
      //     }
      //   );
      //   //TODO: Send the message via whatsapp
      //   return;
      // }
      await Server.updateOne(
        {
          server,
        },
        { server, status: true },
        {
          upsert: true,
        }
      );
    } catch (error) {
      await Server.updateOne(
        {
          server,
        },
        { server, status: false },
        {
          upsert: true,
        }
      );
    }
  });
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
  setInterval(doFetchToServers, 5000);
}

startServer();
