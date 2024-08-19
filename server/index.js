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

async function checkRooms() {
  try {
    const inactivityThreshold = 1000 * 60 * 60 * 24;

    const inactiveRooms = await prisma.salas.findMany({
      where: {
        updateAt: {
          lte: new Date(Date.now() - inactivityThreshold),
        },
      },
    });
    

    if (inactiveRooms.length === 0) {
      return;
    }

    for (const room of inactiveRooms) {
      await prisma.salas_Usuarios.deleteMany({
        where: {
          codigoSala: room.codigoSala,
        },
      });
      await prisma.salas.delete({
        where: {
          codigoSala: room.codigoSala,
        },
      })
    }
  } catch (error) {
    console.error('Error deleting inactive rooms:', error);
  } finally {
    prisma.$disconnect();
  }
}

setInterval(checkRooms, 1000 /* 1000 * 60 * 5*/); // 5 minutos

http.listen(PORT, () => {
  console.log(`Server ligado na porta: ${PORT}`);
});


http.on('close', () => {
  io.sockets.clients().forEach((socket) => {
    socket.disconnect(true);
  });
});
