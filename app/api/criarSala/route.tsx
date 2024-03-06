import { gerarCodigoAleatorio } from "@/app/utils/randomCode";
import { encryptAvatarData } from "@/app/utils/roomUtils/encryptAvatarData";
import prisma from "@/prisma/prisma";

export async function POST(req: Request) {
  const codigo = gerarCodigoAleatorio();
  try {
    const body = await req.json();
    const sala = await prisma.salas.create({
      data: {
        codigoSala: codigo,
        dadosAvatares: encryptAvatarData(body.apelido, body.cor)
      },
    });
    return new Response(JSON.stringify({ sala }), { status:  200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Ocorreu um erro enquanto criava a sala." }), { status:  500 });
  }
}