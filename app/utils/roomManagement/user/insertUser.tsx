'use server';

import prisma from "@/prisma/prisma";

/**
 * Inserts a new user into the salas_Usuarios table.
 *
 * @param {string} codigoSala - The code of the room the user is being inserted into.
 * @param {string} userData - The data of the user being inserted.
 * @param {boolean} host - If the user is the room host
 * @return {Promise<boolean>} A promise that resolves to true if successful, false otherwise.
 */
export async function insertUser(
  codigoSala: string,
  userData: string,
  host: boolean = false,
): Promise<boolean> {
  try {
    await prisma.salas_Usuarios.create({
      data: {
        codigoSala: codigoSala,
        userData: userData,
        host,
      }
    });
    return true;
  } catch (e) {
    console.error('Erro ao inserir usuário:', e);
    return false;
  }
};
