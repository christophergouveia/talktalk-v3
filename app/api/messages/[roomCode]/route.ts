import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { descriptografarUserData, decrypt } from '@/app/utils/crypto/main';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { roomCode: string } }) {
  try {
    const roomCode = await params.roomCode;
    
    // Busca mensagens da sala
    const messages = await prisma.mensagens.findMany({
      where: {
        codigoSala: roomCode
      },
      orderBy: {
        dataEnvio: 'asc'
      }
    });

    // Busca usuários da sala para obter informações dos remetentes
    const roomUsers = await prisma.salas_Usuarios.findMany({
      where: {
        codigoSala: roomCode
      }
    });

    // Descriptografa dados dos usuários
    const usersData = await Promise.all(
      roomUsers.map(async (user) => {
        try {
          const decrypted = await descriptografarUserData(user.userData);
          return decrypted?.data;
        } catch (error) {
          console.error('Erro ao descriptografar dados:', error);
          return null;
        }
      })
    );

    // Descriptografa e formata as mensagens
    const formattedMessages = await Promise.all(messages.map(async (msg) => {
      const sender = usersData.find(u => u?.userToken === msg.usuario);
      
      // Descriptografa a mensagem
      const decryptedMessage = await decrypt(msg.mensagem);
      
      return {
        message: decryptedMessage,
        messageTraduzido: msg.mensagemTraduzida || decryptedMessage,
        senderId: msg.usuario,
        senderApelido: msg.apelido || 'Usuário desconhecido',
        senderAvatar: msg.avatar || '',
        senderColor: sender?.color || '#000000',
        date: msg.dataEnvio,
        lingua: msg.linguaOriginal || 'pt'
      };
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    return NextResponse.json({ error: 'Erro ao buscar mensagens' }, { status: 500 });
  }
}