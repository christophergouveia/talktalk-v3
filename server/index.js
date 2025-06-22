// Load environment variables
require('dotenv').config({ path: './.env' });
require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();
const https = require("https");
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { getTranslation } = require('./translations');

console.log('[DEBUG] Environment check:', {
  DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
  SOCKET_PORT: process.env.SOCKET_PORT,
  NODE_ENV: process.env.NODE_ENV
});

const prisma = new PrismaClient();

// Test database connection
(async () => {
  try {
    await prisma.$connect();
    console.log('[DEBUG] Database connection successful');
  } catch (error) {
    console.error('[DEBUG] Database connection failed:', error.message);
    // Continue without database for now
    console.log('[DEBUG] Continuing without database connection...');
  }
})();
const PORT = process.env.SOCKET_PORT || 3005;

// Check if SSL certificates exist and use HTTPS if available
let server;

// Force HTTP in development for easier debugging
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  console.log('Development mode: using HTTP server');
  server = http.createServer(app);
} else {
  try {
    const httpOptions = {
      key: fs.readFileSync('./ssl/localhost-key.pem'),
      cert: fs.readFileSync('./ssl/localhost.pem'),
    };
    server = https.createServer(httpOptions, app);
    console.log('Production mode: using HTTPS server with SSL certificates');
  } catch (error) {
    console.log('SSL certificates not found, using HTTP server');
    server = http.createServer(app);
  }
}

app.use(cors());

const io = require('socket.io')(server, {
  cors: {
    origin: [
      process.env.NEXT_PUBLIC_VERCEL_URL ? `http://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'http://localhost:3002',
      'http://127.0.0.1:3002',
      'http://localhost:3003',
      'http://127.0.0.1:3003',
      'http://localhost:3004',
      'http://127.0.0.1:3004'
    ],
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
  socket.on('join-room', async (room, userDataParam, userLanguage = 'pt-BR') => {
    try {
      if (!room || !userDataParam) {
        console.error('[DEBUG] Dados inválidos:', { room, userDataParam });
        socket.emit('error', getTranslation(userLanguage, 'userDataError'));
        return;
      }

      let parsedUserData;
      try {
        parsedUserData = typeof userDataParam === 'string' ? JSON.parse(userDataParam) : userDataParam;
      } catch (e) {
        console.error('[DEBUG] Erro ao fazer parse dos dados do usuário:', e);
        socket.emit('error', getTranslation(userLanguage, 'userDataError'));
        return;
      }

      if (!parsedUserData.userToken || !parsedUserData.apelido) {
        console.error('[DEBUG] Dados do usuário incompletos:', parsedUserData);
        socket.emit('error', getTranslation(userLanguage, 'userDataError'));
        return;
      }let cryptoApiBaseUrl;
      if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        const domain = process.env.NEXT_PUBLIC_VERCEL_URL.replace(/^http?:\/\//, '');
        cryptoApiBaseUrl = `http://${domain}`;
      } else {
        cryptoApiBaseUrl = 'http://localhost:3002';
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
      }      const encryptResponse = await import('node-fetch').then(({ default: fetch }) =>
        fetch(cryptoApiEndpoint, fetchOptionsEncrypt)
      );

      if (!encryptResponse.ok) {
        console.error('[DEBUG] Erro na resposta da API de criptografia:', {
          status: encryptResponse.status,
          statusText: encryptResponse.statusText,
          url: cryptoApiEndpoint
        });
        throw new Error(`Crypto API error: ${encryptResponse.status} ${encryptResponse.statusText}`);
      }

      const encryptResult = await encryptResponse.json();
      if (encryptResult.error) {
        throw new Error(encryptResult.error);
      }      const sala = await prisma.salas.findUnique({
        where: { codigoSala: room },
      });

      console.log('[DEBUG] Sala encontrada:', !!sala, sala ? sala.codigoSala : 'N/A');      if (!sala) {
        console.log('[DEBUG] Sala não encontrada, emitindo erro');
        socket.emit('error', getTranslation(userLanguage, 'roomNotFound'));
        return;
      }const isHost = parsedUserData.userToken === sala.hostToken;
      console.log('[DEBUG] Verificando se é host:', isHost, {
        userToken: parsedUserData.userToken?.substring(0, 10) + '...',
        hostToken: sala.hostToken?.substring(0, 10) + '...'
      });
      
      const isUserInRoom = await prisma.salas_Usuarios.findUnique({
        where: { codigoSala_userData: { codigoSala: room, userData: encryptResult.data } },
      });

      console.log('[DEBUG] Usuário já está na sala?', !!isUserInRoom);      if (!isUserInRoom) {
        try {
          console.log('[DEBUG] Criando entrada na tabela salas_Usuarios...');
          await prisma.salas_Usuarios.create({
            data: {
              codigoSala: room,
              userData: encryptResult.data,
              host: isHost,
            },
          });
          console.log('[DEBUG] Usuário inserido na base de dados com sucesso');
        } catch (createError) {
          // Handle unique constraint error - user might already be in room
          if (createError.code === 'P2002') {
            console.log('[DEBUG] Usuário já existe na sala (constraint violation), continuando...');
          } else {
            console.error('[DEBUG] Erro ao inserir usuário:', createError);            socket.emit('error', getTranslation(userLanguage, 'errorJoiningRoom'));
            return;
          }
        }
      } else {
        console.log('[DEBUG] Usuário já está na sala');
      }      console.log('[DEBUG] Buscando usuários da sala...');
      const roomUsers = await prisma.salas_Usuarios.findMany({
        where: { codigoSala: room },
      });

      console.log('[DEBUG] Usuários na sala:', roomUsers.length);
      console.log('[DEBUG] Dados dos usuários:', roomUsers.map(u => ({ userData: u.userData.substring(0, 20) + '...', host: u.host })));      // Verificar limite de usuários (máximo 4)
      const isUserAlreadyInRoom = roomUsers.some(user => user.userData === encryptResult.data);
      console.log('[DEBUG] Usuário já está na sala?', isUserAlreadyInRoom);
        if (!isUserAlreadyInRoom && roomUsers.length >= 4) {
        console.log('[DEBUG] Sala está cheia! Rejeitando entrada (máximo 4 usuários).');
        socket.emit('error', getTranslation(userLanguage, 'roomFull'));
        return;
      }

      console.log('[DEBUG] Descriptografando dados dos usuários...');
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
          }          const decryptResponse = await import('node-fetch').then(({ default: fetch }) =>
            fetch(cryptoApiEndpoint, fetchOptionsDecrypt)
          );

          if (!decryptResponse.ok) {
            console.error('[DEBUG] Erro na resposta da API de descriptografia:', {
              status: decryptResponse.status,
              statusText: decryptResponse.statusText,
              url: cryptoApiEndpoint
            });
            throw new Error(`Decrypt API error: ${decryptResponse.status} ${decryptResponse.statusText}`);
          }

          const decryptResult = await decryptResponse.json();
          return {
            userData: decryptResult.data,
            host: user.host,
          };
        })
      );      socket.join(room);
      userRoom = room;
      userData = encryptResult.data;

      // Atualizar timestamp da sala para indicar atividade
      await prisma.salas.update({
        where: { codigoSala: room },
        data: { updateAt: new Date() }
      });

      console.log('[DEBUG] Enviando users-update com', decryptedUsers.length, 'usuários');
      console.log('[DEBUG] Usuários enviados:', decryptedUsers.map(u => ({ 
        apelido: u.userData?.apelido, 
        host: u.host,
        userToken: u.userData?.userToken?.substring(0, 10) + '...'
      })));
      
      io.to(room).emit('users-update', decryptedUsers);    } catch (error) {
      console.error('[DEBUG] Erro ao processar entrada do usuário:', error);
      socket.emit('error', getTranslation(userLanguage, 'errorJoiningRoom'));
    }
  });
  socket.on('disconnect', async () => {
    if (userRoom && userData) {
      try {        await prisma.salas_Usuarios.deleteMany({
          where: {
            codigoSala: userRoom,
            userData: userData,
          },
        });

        // Atualizar timestamp da sala após desconexão
        await prisma.salas.update({
          where: { codigoSala: userRoom },
          data: { updateAt: new Date() }
        });

        socket.to(userRoom).emit('user-disconnected', userData);

        // Get updated room users
        const roomUsers = await prisma.salas_Usuarios.findMany({
          where: { codigoSala: userRoom },
        });

        // Decrypt user data before sending update
        const decryptedUsers = await Promise.all(
          roomUsers.map(async (user) => {
            try {
              let cryptoApiEndpoint;
              if (process.env.NEXT_PUBLIC_VERCEL_URL) {
                const domain = process.env.NEXT_PUBLIC_VERCEL_URL.replace(/^http?:\/\//, '');
                cryptoApiEndpoint = `http://${domain}/api/crypto`;
              } else {
                cryptoApiEndpoint = 'http://localhost:3002/api/crypto';
              }

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
                const http = require('http');
                const agent = new http.Agent({ rejectUnauthorized: false });
                fetchOptionsDecrypt.agent = agent;
              }

              const decryptResponse = await import('node-fetch').then(({ default: fetch }) =>
                fetch(cryptoApiEndpoint, fetchOptionsDecrypt)
              );

              if (!decryptResponse.ok) {
                console.error('[DEBUG] Erro na resposta da API de descriptografia no disconnect:', {
                  status: decryptResponse.status,
                  statusText: decryptResponse.statusText,
                });
                return null;
              }

              const decryptResult = await decryptResponse.json();
              return {
                userData: decryptResult.data,
                host: user.host,
              };
            } catch (error) {
              console.error('Erro ao descriptografar usuário no disconnect:', error);
              return null;
            }
          })
        );

        // Filter out null entries
        const validDecryptedUsers = decryptedUsers.filter(user => user !== null);
        
        console.log('[DEBUG] Enviando users-update após desconexão:', validDecryptedUsers.length, 'usuários');
        io.to(userRoom).emit('users-update', validDecryptedUsers);
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
    try {      let cryptoApiBaseUrlSendMessage;
      if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        const domain = process.env.NEXT_PUBLIC_VERCEL_URL.replace(/^http?:\/\//, '');
        cryptoApiBaseUrlSendMessage = `http://${domain}`;
      } else {
        cryptoApiBaseUrlSendMessage = 'http://localhost:3002';
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
      }      const encryptedMessage = await import('node-fetch')
        .then(({ default: fetch }) => fetch(cryptoApiEndpointSendMessage, fetchOptionsMessage))
        .then((res) => {
          if (!res.ok) {
            console.error('[DEBUG] Erro na resposta da API de criptografia de mensagem:', {
              status: res.status,
              statusText: res.statusText,
              url: cryptoApiEndpointSendMessage
            });
            throw new Error(`Message crypto API error: ${res.status} ${res.statusText}`);
          }
          return res.json();
        });

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
    // Check if Prisma is connected before running cleanup
    if (!prisma) {
      console.log('[DEBUG] Prisma not available, skipping room cleanup');
      return;
    }

    console.log('[DEBUG] Iniciando verificação de salas...');

    // Verificar salas vazias (sem usuários por 5 minutos)
    const emptyRoomsThreshold = 1000 * 60 * 5; // 5 minutos
    
    // Buscar todas as salas
    const allRooms = await prisma.salas.findMany();
    console.log(`[DEBUG] Total de salas encontradas: ${allRooms.length}`);

    for (const room of allRooms) {
      try {
        // Verificar se a sala tem usuários
        const roomUsers = await prisma.salas_Usuarios.findMany({
          where: { codigoSala: room.codigoSala },
        });

        // Se a sala está vazia e foi atualizada há mais de 5 minutos
        if (roomUsers.length === 0) {
          const timeSinceUpdate = Date.now() - new Date(room.updateAt).getTime();
          
          if (timeSinceUpdate > emptyRoomsThreshold) {
            console.log(`[DEBUG] Removendo sala vazia: ${room.codigoSala} (vazia há ${Math.round(timeSinceUpdate / 1000 / 60)} minutos)`);
            
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
            
            console.log(`[DEBUG] Sala ${room.codigoSala} removida com sucesso`);
          } else {
            console.log(`[DEBUG] Sala ${room.codigoSala} está vazia há ${Math.round(timeSinceUpdate / 1000 / 60)} minutos (aguardando 5 minutos)`);
          }
        } else {
          console.log(`[DEBUG] Sala ${room.codigoSala} tem ${roomUsers.length} usuários ativos`);
        }
      } catch (error) {
        console.error(`[DEBUG] Erro ao verificar sala ${room.codigoSala}:`, error);
      }
    }

    // Também verificar salas muito antigas (24 horas) como backup
    const inactivityThreshold = 1000 * 60 * 60 * 24; // 24 horas
    const oldInactiveRooms = await prisma.salas.findMany({
      where: {
        updateAt: {
          lte: new Date(Date.now() - inactivityThreshold),
        },
      },
    });

    if (oldInactiveRooms.length > 0) {
      console.log(`[DEBUG] Encontradas ${oldInactiveRooms.length} salas antigas (24h+) para remoção`);
      
      for (const room of oldInactiveRooms) {
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
          console.log(`[DEBUG] Sala antiga ${room.codigoSala} removida`);
        } catch (error) {
          console.error(`[DEBUG] Erro ao deletar sala antiga ${room.codigoSala}:`, error);
        }
      }
    }} catch (error) {
    console.error('Erro ao deletar salas inativas:', error);
  }
  // Don't disconnect Prisma here as it's used throughout the app lifecycle
}

setInterval(checkRooms, 1000 * 60 * 5); // Verificar salas vazias a cada 5 minutos

app.get('/', (req, res) => {
  res.send('Servidor http funcionando corretamente');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Socket.IO rodando na porta ${PORT}`);
});

// Add global error handlers to prevent crashes
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
