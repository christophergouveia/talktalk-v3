const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const cookie = require('cookie');
const { PrismaClient } = require('@prisma/client');
const { descriptografarUserData } = require('../app/utils/crypto/main.js');

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: process.env.ORIGIN || process.env.NEXT_PUBLIC_VERCEL_URL,
    credentials: true,
    methods: ['GET', 'POST']
  },
  transports: ['websocket', 'polling']
});

const activeUsers = new Map(); // Armazena usuários ativos e seus dados
const roomUsers = new Map(); // Armazena usuários por sala

io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  let userRoom = null;
  let userToken = null;

  socket.on('join-room', async (room) => {
    userRoom = room;
    const cookies = cookie.parse(socket.handshake.headers.cookie || '');
    const userCookie = cookies['talktalk_userdata'];

    if (!userCookie) {
      socket.disconnect();
      return;
    }

    try {
      const userData = await descriptografarUserData(userCookie);
      userToken = userData.userToken;

      if (!roomUsers.has(room)) {
        roomUsers.set(room, new Map());
      }
      
      roomUsers.get(room).set(userToken, {
        ...userData,
        socketId: socket.id,
        lastActivity: new Date()
      });

      activeUsers.set(userToken, {
        room,
        socketId: socket.id,
        lastActivity: new Date()
      });

      socket.join(room);

      io.in(room).emit('user-connected', userCookie);
      
      const roomMessages = await prisma.mensagens.findMany({
        where: { codigoSala: room },
        orderBy: { dataEnvio: 'asc' },
        take: 100
      });

      socket.emit('previousMessages', roomMessages);
    } catch (error) {
      console.error('Erro ao processar entrada do usuário:', error);
      socket.emit('error', 'Erro ao entrar na sala');
      socket.disconnect();
    }
  });

  socket.on('disconnect', () => {
    if (userToken && userRoom) {
      if (roomUsers.has(userRoom)) {
        roomUsers.get(userRoom).delete(userToken);
        if (roomUsers.get(userRoom).size === 0) {
          roomUsers.delete(userRoom);
        } else {
          const usersInRoom = Array.from(roomUsers.get(userRoom).values());
          io.in(userRoom).emit('room-users-update', usersInRoom);
        }
      }
      activeUsers.delete(userToken);
    }
  });

  socket.on('user-activity', ({ userToken, room }) => {
    if (activeUsers.has(userToken)) {
      activeUsers.get(userToken).lastActivity = new Date();
    }
  });

  socket.on('sendMessage', async (message, userToken, color, apelido, avatar, room, lingua) => {
    const actualDate = new Date().toISOString();
    console.log('[SERVER] Mensagem recebida: ' + message);
    try {
      await prisma.mensagens.create({
        data: {
          codigoSala: room.toString(),
          usuario: userToken,
          mensagem: message,
          dataEnvio: new Date(actualDate),
        },
      });

      io.in(room.toString()).emit('message', {
        message: message,
        userToken,
        date: actualDate,
        apelido,
        avatar,
        color,
        lingua
      });
    } catch (error) {
      console.error('Erro ao salvar mensagem:', error);
      io.to(socket.id).emit('error', 'Falha ao salvar mensagem.');
    }
  });

  socket.on('typing', (typing, userToken, room) => {
    io.in(room.toString()).emit('typing', typing, userToken);
  });

  socket.on('room-update', (room, users) => {
    io.in(room.toString()).emit('room-update', users);
  });

  socket.on('message', (data) => {
    console.log('Mensagem recebida:', {
      room: data.room,
      sender: data.sender.apelido,
      message: data.message
    });
    
    socket.to(data.room).emit('message', data);
    
    console.log('Mensagem enviada para a sala:', data.room);
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
            where: { codigoSala: room.codigoSala },
          }),
          prisma.salas_Usuarios.deleteMany({
            where: { codigoSala: room.codigoSala },
          }),
          prisma.salas.delete({
            where: { codigoSala: room.codigoSala },
          }),
        ]);
      } catch (error) {
        console.error(`Erro ao deletar sala ${room.codigoSala}:`, error);
      }
    }
  } catch (error) {
    console.error('Erro ao deletar salas inativas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setInterval(checkRooms, 1000 * 60 * 5); // 5 minutos

app.get('/', (req, res) => {
  res.send('Servidor HTTP funcionando corretamente');
});

server.listen(PORT, process.env.NEXT_PUBLIC_SOCKET_URL, () => {
  console.log(`Servidor Socket.IO rodando na porta ${PORT} e URL ${process.env.NEXT_PUBLIC_SOCKET_URL}`);
});

server.on('close', () => {
  io.sockets.clients().forEach((socket) => {
    socket.disconnect(true);
  });
});
