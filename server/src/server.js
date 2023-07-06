const http = require("http");

require("dotenv").config(); //To able the configurations in the .env file

const app = require("./app");

const { mongoConnect } = require("./services/mongo");

// const icmp = require("icmp");
// const dns = require("dns");

// const targetHost = "www.uttn.edu.mx";

// // Function to send a ping
// function sendPing() {
//   dns.lookup(targetHost, function (err, address) {
//     if (err) {
//       console.error("DNS lookup failed:", err);
//       return;
//     }
//     console.log({address});
//     //console.log("DNS lookup correct: ", address);
//     icmp.send(address, "Hey, I'm sending a message!")
//     .then(obj => {
//         console.log(obj.open ? 'Done' : 'Failed')
//     })
//     .catch(err => console.log(err));
//   });
// }

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

  // // Schedule pings every 5 seconds
  // setInterval(sendPing, 5000);
}

startServer();
