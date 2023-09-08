const express = require("express");
const { SOCKET } = require("./socket/constants");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const driverLocations = {
  // driver1: { lat: 10.7769, lng: 106.7009 }, // District 1
  // driver2: { lat: 10.7654, lng: 106.6973 }, // District 3
  // driver3: { lat: 10.7916, lng: 106.7078 }, // District 4
  // driver4: { lat: 10.8491, lng: 106.6297 }, // Binh Thanh District
  // driver5: { lat: 10.7601, lng: 106.6636 }, // Phu Nhuan District
};

const customerRequest = {};
const listbooking = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on(SOCKET.JOIN_ROOM, (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  socket.on(SOCKET.UPDATE_LOCATION_DRIVER, (data) => {
    const temp = { lat: data.lat, lng: data.lng };
    driverLocations[data.driverinfo] = temp;

    for (const driverid in listbooking) {
      const tmp = listbooking[driverid];
      const datatemp = { location: { lat: data.lat, lng: data.lng }, ...tmp };
      socket
        .to(listbooking[driverid].idcustomer)
        .emit(SOCKET.UPDATE_LOCATION_DRIVER_TO_CUSTOMER, datatemp);
    }
  });

  socket.on(SOCKET.BOOKING, (data) => {
    console.log(data);
    const messages = {
      data: data,
      messages: "Send to driver success",
    };
    socket.emit(SOCKET.SEND_DRIVERS_LOCATION, driverLocations);
    for (const driverName in driverLocations) {
      socket.to(driverName).emit(SOCKET.SEND_CUSTOMER_LOCATION, messages);
    }
  });

  socket.on(SOCKET.SEND_ACCEPT_BOOKING, (data) => {
    const temp = {
      idcustomer: data.idcustomer,
      name: data.name,
      identify: data.identify,
      brandName: data.brandName,
    };
    listbooking[data.driver] = temp;

    socket.to(data.idcustomer).emit(SOCKET.SEND_ACCEPT_BOOKING_SUCCESS, data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`SERVER RUNNING on ${PORT}`);
});
