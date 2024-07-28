'use server';

import prisma from '@/prisma/prisma';

export default async function fetchRoom(codigo: string) {
  const room = await prisma?.salas.findUnique({
    where: {
      codigoSala: codigo,
    },
  });
  if (!room) return null;
  return room;
}
