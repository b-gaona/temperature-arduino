const http = require("http");

require("dotenv").config(); //To able the configurations in the .env file

const app = require("./app");

const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT || 8000; //To avoid conflict with the 3000 that's using React
const IP_ADDRESS = process.env.IP_ADDRESS || "localhost";

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  console.log(`${process.env.IP_ADDRESS}:${process.env.PORT}`);

  if (IP_ADDRESS === "192.168.137.1") {
    server.listen(PORT,  () => {
      console.log(`Server listening on ${process.env.IP_ADDRESS}:${PORT}`);
    });
  } else {
    server.listen(PORT, () => {
      const address = server.address();
      console.log(`Server listening on ${address.address}:${PORT}`);
    });
  }
}

startServer();
