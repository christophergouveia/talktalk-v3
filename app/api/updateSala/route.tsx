import { prisma } from "@/prisma/prisma";

export async function UPDATE(req: Request) {
    const codigo = JSON.parse(await req.text()).codigo;
    const pessoas = JSON.parse(await req.text()).pessoasConectadas;

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