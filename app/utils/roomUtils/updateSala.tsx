export default async function updateSala(pessoasConectadas: number, codigo: string) {
    const response = await fetch('/api/updateSala', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            codigo: codigo,
            pessoasConectadas: pessoasConectadas
        }),
    });

    if (!response.ok) {
        console.error('Erro ao atualizar a sala', response.statusText);
    }
}