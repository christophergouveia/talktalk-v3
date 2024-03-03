const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");

const origin = process.env.NEXT_PUBLIC_VERCEL_URL.replace(":3000", "") || "localhost";
const io = new Server(http, {
  cors: {
    origin: origin + ":3000",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log('Um novo usuário entrou no site: ', socket.id);
  io.emit("client-connected", socket.id);

  socket.on('disconnect', () => {
    console.log('Um usuário saiu do site');
    io.emit("client-disconnected", socket.id);
  });
});

const PORT = 3001;
http.listen(PORT, () => {
  console.log(`Server ligado na porta: ${PORT}`);
});
