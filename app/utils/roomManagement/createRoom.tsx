'use server';

import { gerarCodigoAleatorio } from '../randomCode';
import prisma from '@/prisma/prisma';

/**
 * Creates a new room by generating a unique code and checking if it already exists in the database.
 * If the code does not exist, a new room is created with the generated code.
 * If the code already exists, the function calls itself recursively to generate a new code.
 *
 * @return {string} The unique code of the newly created room.
 */
export default async function createRoom() {
  const codigo = gerarCodigoAleatorio();
  const existingRoom = await prisma?.salas.findUnique({
    where: {
      codigoSala: codigo,
    },
  });

  if (!existingRoom) {
    await prisma?.salas.create({
      data: {
        codigoSala: codigo,
      },
    });
  } else {
    return createRoom();
  }
  prisma.$disconnect();

  return codigo;
}
