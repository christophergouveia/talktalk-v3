const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const origin = process.env.NEXT_PUBLIC_VERCEL_URL;
const cookie = require("cookie");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PORT = 3001;

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

async function deleteInactiveRooms() {
  try {
    const inactivityThreshold = 1000 * 60 * 60 * 24 + (3 * 60 * 60 * 1000);

    const inactiveRooms = await prisma.salas.findMany({
      where: {
        updateAt: {
          lte: new Date(Date.now() - inactivityThreshold),
        },
      },
    });

    for (const room of inactiveRooms) {
      await prisma.salas_Usuarios.deleteMany({
        where: {
          codigoSala: room.codigoSala,
        },
      });
    }
  } catch (error) {
    console.error('Error deleting inactive rooms:', error);
  } finally {
    prisma.$disconnect();
  }
}

setInterval(deleteInactiveRooms, 1000);

http.listen(PORT, () => {
  console.log(`Server ligado na porta: ${PORT}`);
});


http.on('close', () => {
  io.sockets.clients().forEach((socket) => {
    socket.disconnect(true);
  });
});
