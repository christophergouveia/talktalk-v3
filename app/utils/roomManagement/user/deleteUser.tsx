'use server';

import prisma from "/prisma/prisma";

/**
 * Deletes a user from a room.
 *
 * @param {string} codigoSala - The code of the room.
 * @param {string} userData - The user data to be deleted.
 * @return {Promise<void>} A promise that resolves when the deletion is complete.
 */
export const deleteUser = async (
    codigoSala: string,
    userData: string
  ) => {
    await prisma.salas_Usuarios.delete({
      where: {
        codigoSala_userData: {
          codigoSala,
          userData
        }
      }
    });
  };