export default async function updateDadosAvatares(dadosAvatar = {}, sala: string = "", adicionar = false) {
  if (!dadosAvatar) {
      throw new Error('Dados dos avatares não fornecido');
  }

  const response = await fetch('/api/updateSala', {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          dadosAvatar, sala, adicionar
      }),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro ao atualizar a sala: ${response.statusText}, ${errorData.error}`);
  }
}