'use server';

import { Salas } from '@prisma/client';
import prisma from '@/prisma/prisma';

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
