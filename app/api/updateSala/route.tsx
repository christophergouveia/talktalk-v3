import prisma from "@/prisma/prisma";

export async function PATCH(req: Request) {
  const requestBody = JSON.parse(await req.text());
  const codigo = requestBody.codigo;
  const pessoas = requestBody.pessoasConectadas;
  const socketIds = requestBody.socketIds || "";
  let updateResult;
  if (!pessoas) {
    updateResult = await prisma.salas.update({
      where: {
        codigoSala: codigo.room,
      },
      data: {
        codigoSala: codigo.room,
        socketIds: codigo.socketId,
      },
    });
  } else {
    updateResult = await prisma.salas.update({
        where: {
          codigoSala: codigo,
        },
        data: {
          codigoSala: codigo,
          pessoasConectadas: pessoas,
          socketIds: socketIds,
        },
      });
  }


  return new Response(JSON.stringify({ updateResult }), { status: 200 });
}
