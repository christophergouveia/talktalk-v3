const express = require('express');
const app = express();
const https = require("https");
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

const httpOptions = {
  key: fs.readFileSync('./server/ssl/localhost-key.pem'),
  cert: fs.readFileSync('./server/ssl/localhost.pem'),
};

// const server = http.createServer(httpOptions, app);
const server = http.createServer(app);

app.use(cors());

const io = require('socket.io')(server, {
  cors: {
    origin: [`http://${process.env.NEXT_PUBLIC_VERCEL_URL}`, `http://127.0.0.1:${process.env.NEXT_PUBLIC_PORT}`],
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['my-custom-header'],
  },
  pingTimeout: 120000,
  pingInterval: 45000,
  transports: ['websocket', 'polling'],
  allowEIO3: true,
  connectTimeout: 45000,
});

io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  let userRoom = null;
  let userData = null;

  socket.on('join-room', async (room, userDataParam) => {
    try {
      if (!room || !userDataParam) {
        console.error('[DEBUG] Dados inválidos:', { room, userDataParam });
        socket.emit('error', 'Dados inválidos para entrar na sala');
        return;
      }

      let parsedUserData;
      try {
        parsedUserData = typeof userDataParam === 'string' ? JSON.parse(userDataParam) : userDataParam;
      } catch (e) {
        console.error('[DEBUG] Erro ao fazer parse dos dados do usuário:', e);
        socket.emit('error', 'Dados do usuário inválidos');
        return;
      }

      if (!parsedUserData.userToken || !parsedUserData.apelido) {
        console.error('[DEBUG] Dados do usuário incompletos:', parsedUserData);
        socket.emit('error', 'Dados do usuário incompletos');
        return;
      }

      let cryptoApiBaseUrl;
      if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        const domain = process.env.NEXT_PUBLIC_VERCEL_URL.replace(/^http?:\/\//, '');
        cryptoApiBaseUrl = `http://${domain}`;
      } else {
        cryptoApiBaseUrl = 'http://localhost:3000';
      }
      const cryptoApiEndpoint = `${cryptoApiBaseUrl}/api/crypto`;

      let fetchOptionsEncrypt = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CRYPTO_API_KEY}`,
        },
        body: JSON.stringify({
          data: parsedUserData,
          action: 'encryptUserData',
        }),
      };

      if (
        process.env.NODE_ENV === 'development' &&
        (cryptoApiEndpoint.startsWith('http://localhost') || cryptoApiEndpoint.startsWith('http://127.0.0.1'))
      ) {
        const agent = new http.Agent({ rejectUnauthorized: false });
        fetchOptionsEncrypt.agent = agent;
      }

      const encryptResponse = await import('node-fetch').then(({ default: fetch }) =>
        fetch(cryptoApiEndpoint, fetchOptionsEncrypt)
      );

      const encryptResult = await encryptResponse.json();
      if (encryptResult.error) {
        throw new Error(encryptResult.error);
      }

      const sala = await prisma.salas.findUnique({
        where: { codigoSala: room },
      });

      if (!sala) {
        socket.emit('error', 'Sala não encontrada');
        return;
      }

      const isHost = parsedUserData.userToken === sala.hostToken;
      const isUserInRoom = await prisma.salas_Usuarios.findUnique({
        where: { codigoSala_userData: { codigoSala: room, userData: encryptResult.data } },
      });

      if (!isUserInRoom) {
        await prisma.salas_Usuarios.create({
          data: {
            codigoSala: room,
            userData: encryptResult.data,
            host: isHost,
          },
        });
      }

      const roomUsers = await prisma.salas_Usuarios.findMany({
        where: { codigoSala: room },
      });

      const decryptedUsers = await Promise.all(
        roomUsers.map(async (user) => {
          let fetchOptionsDecrypt = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.CRYPTO_API_KEY}`,
            },
            body: JSON.stringify({
              data: user.userData,
              action: 'decryptUserData',
            }),
          };

          if (
            process.env.NODE_ENV === 'development' &&
            (cryptoApiEndpoint.startsWith('http://localhost') || cryptoApiEndpoint.startsWith('http://127.0.0.1'))
          ) {
            const agent = new http.Agent({ rejectUnauthorized: false });
            fetchOptionsDecrypt.agent = agent;
          }

          const decryptResponse = await import('node-fetch').then(({ default: fetch }) =>
            fetch(cryptoApiEndpoint, fetchOptionsDecrypt)
          );

          const decryptResult = await decryptResponse.json();
          return {
            userData: decryptResult.data,
            host: user.host,
          };
        })
      );

      socket.join(room);
      userRoom = room;
      userData = encryptResult.data;

      io.to(room).emit('users-update', decryptedUsers);
    } catch (error) {
      console.error('[DEBUG] Erro ao processar entrada do usuário:', error);
      socket.emit('error', 'Erro ao entrar na sala');
    }
  });

  socket.on('disconnect', async () => {
    if (userRoom && userData) {
      try {
        await prisma.salas_Usuarios.deleteMany({
          where: {
            codigoSala: userRoom,
            userData: userData,
          },
        });

        socket.to(userRoom).emit('user-disconnected', userData);

        const roomUsers = await prisma.salas_Usuarios.findMany({
          where: { codigoSala: userRoom },
        });

        io.to(userRoom).emit('users-update', roomUsers);
      } catch (error) {
        console.error('Erro ao processar desconexão:', error);
      }
    }

    socket.leave(userRoom);
    userRoom = null;
    userData = null;
  });

  socket.on('user-activity', ({ userToken, room }) => {});

  socket.on('sendMessage', async (message, userToken, color, apelido, avatar, room, lingua, type) => {
    const actualDate = new Date().toISOString();
    console.log('[SERVER] Mensagem recebida: ' + message);
    try {
      let cryptoApiBaseUrlSendMessage;
      if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        const domain = process.env.NEXT_PUBLIC_VERCEL_URL.replace(/^http?:\/\//, '');
        cryptoApiBaseUrlSendMessage = `http://${domain}`;
      } else {
        cryptoApiBaseUrlSendMessage = 'http://localhost:3000';
      }
      const cryptoApiEndpointSendMessage = `${cryptoApiBaseUrlSendMessage}/api/crypto`;

      let fetchOptionsMessage = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CRYPTO_API_KEY}`,
        },
        body: JSON.stringify({
          data: message,
          action: 'encrypt',
        }),
      };

      if (
        process.env.NODE_ENV === 'development' &&
        (cryptoApiEndpointSendMessage.startsWith('http://localhost') ||
          cryptoApiEndpointSendMessage.startsWith('http://127.0.0.1'))
      ) {
        const agent = new http.Agent({ rejectUnauthorized: false });
        fetchOptionsMessage.agent = agent;
      }

      const encryptedMessage = await import('node-fetch')
        .then(({ default: fetch }) => fetch(cryptoApiEndpointSendMessage, fetchOptionsMessage))
        .then((res) => res.json());

      if (type !== 'audio') {
        await prisma.mensagens.create({
          data: {
            codigoSala: room.toString(),
            usuario: userToken,
            mensagem: encryptedMessage.data,
            dataEnvio: new Date(actualDate),
            apelido: apelido,
            avatar: avatar,
            linguaOriginal: lingua,
          },
        });
      }

      io.in(room.toString()).emit('message', {
        message: message,
        userToken,
        date: actualDate,
        apelido,
        avatar,
        color,
        lingua,
        type,
      });
    } catch (error) {
      console.error('Erro ao salvar mensagem:', error);
      io.to(socket.id).emit('error', 'Falha ao salvar mensagem.');
    }
  });

  socket.on('typing', ({ typing, userToken, room }) => {
    socket.to(room).emit('users-typing', { userToken, typing });
  });

  socket.on('room-update', (room, users) => {
    io.in(room.toString()).emit('room-update', users);
  });

  socket.on('message', (data) => {
    console.log('Mensagem recebida:', {
      room: data.room,
      sender: data.senderApelido,
      message: data.message,
    });

    socket.to(data.room).emit('message', data);

    console.log('Mensagem enviada para a sala:', data.room);
  });
});

io.engine.on('connection_error', (err) => {
  console.log('Erro de conexão:', {
    req: err.req,
    code: err.code,
    message: err.message,
    context: err.context,
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
  res.send('Servidor http funcionando corretamente');
});

server.listen(PORT, process.env.NEXT_PUBLIC_SOCKET_URL, () => {
  console.log(`Servidor Socket.IO rodando na porta ${PORT} e URL ${process.env.NEXT_PUBLIC_SOCKET_URL}`);
});
