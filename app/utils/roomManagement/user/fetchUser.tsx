'use server';

import prisma from "@/prisma/prisma";

/**
 * Fetches a user from the database based on the provided room code and user data.
 *
 * @param {string} codigoSala - The code of the room.
 * @param {string} userData - The user data to be fetched.
 * @return {Promise<unknown>} A promise that resolves with the fetched user data.
 */
export const fetchUser = async (
  codigoSala: string,
  userData: string
) => {
    await prisma.salas_Usuarios.findFirst({
        where: {
            codigoSala,
            userData
        }
    });
};
