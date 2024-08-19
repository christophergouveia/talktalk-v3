'use server';

import prisma from '@/prisma/prisma';

/**
 * Fetches users in the room from the database by its unique code.
 *
 * @param {string} codigo - The unique code of the room to be fetched.
 * @return {object|null} The fetched users in the room object, or null if the room was not found.
 */
export default async function fetchRoom(codigo: string) : Promise<any> {
  const room = await prisma?.salas_Usuarios.findMany({
    where: {
        codigoSala: codigo
    },
  });
  if (!room) return null;
  return room;
}
