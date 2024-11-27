'use server';   

import prisma from '@/prisma/prisma';

export const getUsersRoomData = async (roomCode: string) => {
  const users = await prisma.salas_Usuarios.findMany({
    where: {
      codigoSala: roomCode
    }
  });
  return users || [];
};