const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const cookie = require('cookie');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Configurações SSL
const options = {
  key: fs.readFileSync('/etc/nginx/ssl/private.key'),
  cert: fs.readFileSync('/etc/nginx/ssl/certificate.crt'),
};

// Criar servidor HTTPS em vez de HTTP
const server = https.createServer(options, app);

const io = require('socket.io')(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_VERCEL_URL,
    credentials: true,
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling']
  },
  allowEIO3: true,
  path: '/socket.io/'
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    const userToken = socket.userToken;
    if (userToken) {
      io.in(socket.room).emit('user-disconnected', userToken);
    }
    console.log('Usuário saiu da sala!');
  });
  socket.on('sendMessage', async (message, userToken, apelido, avatar, room, lingua, senderColor) => {
    const actualDate = new Date().toISOString();
    console.log('Mensagem recebida: ' + message);
    try {
      await prisma.mensagens.create({
        data: {
          codigoSala: room.toString(),
          usuario: userToken,
          mensagem: message,
          dataEnvio: new Date(actualDate),
          // apelido,
          // avatar
        },
      });

      io.in(room.toString()).emit('message', {
        message: message,
        userToken,
        date: actualDate,
        from: lingua,
        apelido,
        avatar,
        senderColor
      });
    } catch (error) {
      console.error('Error saving message:', error);
      io.to(socket.id).emit('error', 'Failed to save message.');
    }
  });
  
  socket.on('typing', (typing, userToken, room) => {
    console.log('Usuário está digitando: ' + userToken);
    io.in(room.toString()).emit('typing', typing, userToken);
  });

  socket.on('room-update', (room, users) => {
    io.in(room.toString()).emit('room-update', users);
  });

  socket.on('join-room', async (room) => {
    socket.room = room;
    console.log('Usuário entrou na sala: ' + room, socket.id);
    const cookies = cookie.parse(socket.handshake.headers.cookie || '');
    const userCookie = cookies['talktalk_userdata'];

    console.log(userCookie);
    
    io.in(room.toString()).emit('user-connected', userCookie);
    socket.join(room.toString());

    try {
      const roomMessages = await prisma.mensagens.findMany({
        where: {
          codigoSala: room.toString(),
        },
        orderBy: { dataEnvio: 'asc' },
      });
      socket.emit('previousMessages', roomMessages);
    } catch (error) {
      console.error('Error fetching previous messages:', error);
    }
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
      try {
        await prisma.$transaction([
          prisma.mensagens.deleteMany({
            where: { codigoSala: room.codigoSala }
          }),
          prisma.salas_Usuarios.deleteMany({
            where: { codigoSala: room.codigoSala }
          }),
          prisma.salas.delete({
            where: { codigoSala: room.codigoSala }
          })
        ]);
      } catch (error) {
        console.error(`Erro ao deletar sala ${room.codigoSala}:`, error);
      }
    }
  } catch (error) {
    console.error('Error deleting inactive rooms:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setInterval(checkRooms, 1000 /* 1000 * 60 * 5*/); // 5 minutos

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor HTTPS ligado na porta: ${PORT}`);
});

server.on('close', () => {
  io.sockets.clients().forEach((socket) => {
    socket.disconnect(true);
  });
});
