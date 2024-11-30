'use server';

import prisma from '/prisma/prisma';

/**
 * Fetches a room from the database by its unique code.
 *
 * @param {string} codigo - The unique code of the room to be fetched.
 * @return {object|null} The fetched room object, or null if the room was not found.
 */
export default async function fetchRoom(codigo: string) {
  const room = await prisma?.salas.findUnique({
    where: {
      codigoSala: codigo,
    },
  });
  if (!room) return null;
  return room;
}
