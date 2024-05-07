const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const CryptoJS = require("crypto-js");
const cookie = require("cookie");
const origin = process.env.NEXT_PUBLIC_VERCEL_URL;
const io = new Server(http, {
  cors: {
    origin: origin ? origin : "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("Usuário conectado! SocketID: " + socket.id);
  console.log(socket.handshake.headers)
  // socket.on("disconnect", () => {
  //   io.in(room.toString()).emit("user-disconnected");
  // })
  socket.on("sendMessage", (message, socketId, room) => {
    console.log("Mensagem recebida: " + message);
    io.in(room.toString()).emit("message", { message: message, socketId: socketId });
  });
  socket.on("join-room", (room) => {
    console.log("Usuário entrou na sala: " + room, socket.id);
    socket.join(room.toString());
    io.in(room.toString()).emit("user-connected");
  });
});

const PORT = 3001;
http.listen(PORT, () => {
  console.log(`Server ligado na porta: ${PORT}`);
});
