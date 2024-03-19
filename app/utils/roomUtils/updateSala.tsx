export default async function updateSala(pessoasConectadas: number, codigo: string, socketIds = '', dadosAvatar = {}) {
    if (!codigo) {
        throw new Error('Código da sala não fornecido');
    }

    const response = await fetch('/api/updateSala', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            codigo,
            pessoasConectadas,
            socketIds,
            dadosAvatar
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao atualizar a sala: ${response.statusText}, ${errorData.error}`);
    }
}