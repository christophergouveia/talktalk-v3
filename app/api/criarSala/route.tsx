import { prisma } from "@/prisma/prisma";

export async function POST(req: Request) {
  const codigo = JSON.parse(await req.text()).codigo;

  try {
    const sala = await prisma.salas.create({
      data: {
        codigoSala: codigo,
      },
    });
    return new Response(JSON.stringify({ sala }), { status:  200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Ocorreu um erro enquanto criava a sala." }), { status:  500 });
  }
}