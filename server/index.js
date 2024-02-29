const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(http, {
  cors: {
    origin: window.location.origin + ":3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});
});

const PORT = 3001;
http.listen(PORT, () => {
  console.log(`Server ligado na porta: ${PORT}`);
});
