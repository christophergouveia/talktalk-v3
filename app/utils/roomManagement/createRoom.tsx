'use server';

import codigoAleatorio from '../strings/randomCode';
import prisma from '@/prisma/prisma';

/**
 * Creates a new room by generating a unique code and checking if it already exists in the database.
 * If the code does not exist, a new room is created with the generated code.
 * If the code already exists, the function calls itself recursively to generate a new code.
 *
 * @param {string} token - The token associated with the room.
 * @return {string} The unique code of the newly created room.
 */
export default async function createRoom({ token, hostToken } : { token: string, hostToken: string }) {
  const codigo = codigoAleatorio.get();
  const existingRoom = await prisma?.salas.findUnique({
    where: {
      codigoSala: codigo,
    },
  });

  if (!existingRoom) {
    await prisma?.salas.create({
      data: {
        codigoSala: codigo,
        token: token,
        hostToken: hostToken
      },
    });
  } else {
    return createRoom({ token: token, hostToken: hostToken });
  }
  prisma.$disconnect();

  return codigo;
}
