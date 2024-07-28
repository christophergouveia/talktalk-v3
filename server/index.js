const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const origin = process.env.NEXT_PUBLIC_VERCEL_URL;
const cookie = require("cookie");

const io = new Server(http, {
  cookie: true,
  cors: {
    origin: origin ? origin : 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Usuário conectado! SocketID: ' + socket.id);
  console.log('Cookies: ' + socket.handshake.headers.cookie);
  socket.on('disconnect', (room) => {
    console.log('Usuário saiu da sala!');
  });
  socket.on('sendMessage', (message, socketId, room) => {
    const actualDate = new Date().toISOString();
    console.log('Mensagem recebida: ' + message);
    io.in(room.toString()).emit('message', { message: message, socketId: socketId, date: actualDate });
  });
  socket.on('join-room', (room) => {
    console.log('Usuário entrou na sala: ' + room, socket.id);
    socket.join(room.toString());
    io.in(room.toString()).emit('user-connected');
  });
});

const PORT = 3001;
http.listen(PORT, () => {
  console.log(`Server ligado na porta: ${PORT}`);
});


http.on('close', () => {
  io.sockets.clients().forEach((socket) => {
    socket.disconnect(true);
  });
});
