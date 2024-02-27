const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("client-connected", (message) => {
    io.emit('client-connected', message);
  });

  socket.on("disconnect", () => {});
});

const PORT = 3001;
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
