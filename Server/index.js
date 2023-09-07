const express = require("express");
const { SOCKET } = require('./socket/constants');
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
  driver1: { lat: 10.7769, lng: 106.7009 }, // District 1
  driver2: { lat: 10.7654, lng: 106.6973 }, // District 3
  driver3: { lat: 10.7916, lng: 106.7078 }, // District 4
  driver4: { lat: 10.8491, lng: 106.6297 }, // Binh Thanh District
  driver5: { lat: 10.7601, lng: 106.6636 }, // Phu Nhuan District
};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on(SOCKET.JOIN_ROOM, (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  socket.on(SOCKET.BOOKING, (data) => {
    console.log(data);
    const messages = {
      data: data,
      messages: "oke123",
    };
    socket.emit(SOCKET.SEND_CUSTOMER_LOCATION, driverLocations);
    socket.to("driver1").emit(SOCKET.SEND_DRIVERS_LOCATION, messages);
  });

  socket.on("send_location_to_customer", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
const PORT=3001
server.listen(PORT, () => {
  console.log(`SERVER RUNNING on ${PORT}`);
});
