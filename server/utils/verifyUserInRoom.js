const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifyUserInRoom(roomId, userData) {
  const user = await prisma.salas_Usuarios.findUnique({
    where: {
      codigoSala_userData: {
        codigoSala: roomId,
        userData: userData
      }
    }
  });

  return user;
}

module.exports = verifyUserInRoom;
