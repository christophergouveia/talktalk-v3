import { prisma } from "@/prisma/prisma";

export async function PATCH(req: Request) {
    const requestBody = JSON.parse(await req.text());
    const codigo = requestBody.codigo;
    const pessoas = requestBody.pessoasConectadas;

    const updateResult = await prisma.salas.update({
        where: {
            codigoSala: codigo
        },
        data: {
            codigoSala: codigo,
            pessoasConectadas: pessoas
        }
    })

    return new Response(JSON.stringify({ updateResult }), { status: 200 });
}