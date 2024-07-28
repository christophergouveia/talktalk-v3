'use server';

import { gerarCodigoAleatorio } from '../randomCode';
import prisma from '@/prisma/prisma';

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
