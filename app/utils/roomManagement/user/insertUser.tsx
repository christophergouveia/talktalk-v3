'use server';

import prisma from "@/prisma/prisma";

/**
 * Inserts a new user into the salas_Usuarios table.
 *
 * @param {string} codigoSala - The code of the room the user is being inserted into.
 * @param {string} userData - The data of the user being inserted.
 * @return {Promise} A promise that resolves when the user has been inserted.
 */
export const insertUser = async (
  codigoSala: string,
  userData: string
) => {
  await prisma.salas_Usuarios.create({
    data: {
      codigoSala,
      userData
    },
  });
};
