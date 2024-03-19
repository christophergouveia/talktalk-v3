import prisma from "@/prisma/prisma";
import { encryptAvatarData } from '../../utils/roomUtils/encryptAvatarData';
import CryptoJS from "crypto-js";

interface dataInterface {
  codigoSala: string,
  socketIds: string,
  pessoasConectadas?: number,
  dadosAvatares?: string
}

export async function PATCH(req: Request) {
  const requestBody = JSON.parse(await req.text());
  const codigo = requestBody.sala;
  const pessoas = requestBody.pessoasConectadas;
  const socketIds = requestBody.socketIds || "";
  const dadosAvatar = requestBody.dadosAvatar || "";
  console.log(requestBody)
  let updateResult;

  if (!codigo) {
    return new Response(JSON.stringify({ error: 'Código da sala não fornecido' }), { status: 400 });
  }

  const sala = await prisma.salas.findUnique({
    where: {
      codigoSala: codigo,
    },
  });

  if (!sala) {
    return new Response(JSON.stringify({ error: 'Sala não encontrada' }), { status: 404 });
  }

  const data: dataInterface = {
    codigoSala: codigo,
    socketIds: codigo.socketId,
  };

  if (pessoas) {
    data.pessoasConectadas = pessoas;
    data.socketIds = socketIds;
  } else if (dadosAvatar.apelido && dadosAvatar.cor) {
    const bytes = CryptoJS.AES.decrypt(
      sala.dadosAvatares || "",
      process.env.NEXT_PUBLIC_SECRET_UUID || ""
    );
    const dados = bytes.toString(CryptoJS.enc.Utf8);
    if (dados.split("|").length >= 2) {
      data.dadosAvatares = `${encryptAvatarData(dadosAvatar.apelido, dadosAvatar.cor)}${sala.dadosAvatares}`;
    }
  }

  updateResult = await prisma.salas.update({
    where: {
      codigoSala: codigo,
    },
    data,
  });

  return new Response(JSON.stringify({ updateResult }), { status: 200 });
}
