'use server';

import { Salas } from '@prisma/client';
import prisma from '@/prisma/prisma';

/**
 * Updates a room in the database with the provided data.
 *
 * @param {string} sala - The code of the room to be updated.
 * @param {Partial<Salas>} dados - The data to update the room with.
 * @return {Promise<Salas | null>} The updated room object, or null if the room was not found.
 */
export default async function updateRoom(sala: string, dados: Partial<Salas>) {
  const room = await prisma?.salas.findUnique({
    where: {
      codigoSala: sala,
    },
  });
  if (!room) return null;
  try {
    await prisma?.salas.update({
      where: {
        codigoSala: sala,
      },
      data: dados,
    });
  } catch (e) {
    return false;
  } finally {
    prisma.$disconnect;
  }
  return room;
}
