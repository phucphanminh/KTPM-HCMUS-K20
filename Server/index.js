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
    console.log(data);
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
    // customer book car after send location surroundings for customer
    const messages = {
      data: data,
      messages: "Send to driver success",
    };
    socket.emit(SOCKET.SEND_DRIVERS_LOCATION, driverLocations);
    customerRequest[data.Customer?.id] = {
      destination: data.destination,
      origin: data.origin,
      Customer: data.Customer,
      cardetails: data.cardetails,
    };
    console.log(customerRequest[data.Customer?.id]);
    for (const driverName in driverLocations) {
      socket.to(driverName).emit(SOCKET.SEND_CUSTOMER_LOCATION, messages);
    }
  });

  socket.on(SOCKET.GET_LOCATION_CUSTOMER, () => {
    // send location customer request to driver when request

    for (const customer in customerRequest) {
      console.log(customerRequest[customer]);
      const data = { data: { ...customerRequest[customer] } };
      socket.emit(SOCKET.GET_LOCATION_CUSTOMER_ARRAY, data);
    }
  });

  socket.on(SOCKET.SEND_ACCEPT_BOOKING, (data) => {
    const temp = {
      idcustomer: data.idcustomer,
      name: data.name,
      identify: data.identify,
      brandName: data.brandName,
    };
    delete customerRequest[data.idcustomer];
    console.log(customerRequest);
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
