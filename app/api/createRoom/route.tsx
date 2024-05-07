import { gerarCodigoAleatorio } from "@/app/utils/randomCode";
import prisma from "@/prisma/prisma";

export async function POST(req: Request) {
  const codigo = gerarCodigoAleatorio();
  const { apelido, cor } = await req.json();
  try {
    const sala = await prisma.salas.create({
      data: {
        codigoSala: codigo
      },
    });
    return new Response(JSON.stringify({ sala }), { status:  200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred as it created the room." }), { status:  500 });
  }
}