'use server';

import prisma from "@/prisma/prisma";

/**
 * Inserts a new user into the salas_Usuarios table.
 *
 * @param {string} codigoSala - The code of the room the user is being inserted into.
 * @param {string} userData - The data of the user being inserted.
 * @param {boolean} host - If the user is the room host
 * @return {Promise} A promise that resolves when the user has been inserted.
 */
export const insertUser = async (
  codigoSala: string,
  userData: string,
  host: boolean = false,
) => {
  try {
    await prisma.salas_Usuarios.create({
      data: {
        codigoSala,
        userData,
        host,
      },
    });
    return true;
  } catch (e) {
    console.error(e)
  }
};
