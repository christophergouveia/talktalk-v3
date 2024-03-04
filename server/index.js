const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");

const origin = process.env.NEXT_PUBLIC_VERCEL_URL;
const io = new Server(http, {
  cors: {
    origin: origin ? origin : "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log('Um novo usuário entrou no site: ', socket.id);
  io.emit("client-connected", socket.id);

  socket.on("join-room", (roomId, userId) => {
    console.log("Usuário entrou na sala: ", roomId);
    socket.join(roomId);
    // socket.to(roomId).broadcast.emit("user-connected", userId);
  });

  socket.on("exit-room", (roomId, userId) => {
    console.log("Usuário saiu da sala: ", roomId);
    socket.leave(roomId);
    // socket.to(roomId).broadcast.emit("user-exited", userId);
  })

  socket.on('disconnect', () => {
    console.log('Um usuário saiu do site');
    io.emit("client-disconnected", socket.id);
  });
});

const PORT = 3001;
http.listen(PORT, () => {
  console.log(`Server ligado na porta: ${PORT}`);
});
