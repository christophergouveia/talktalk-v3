export function gerarCodigoAleatorio(): string {
  const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const tamanhos = [4, 5, 6];
  const tamanhoSelecionado = tamanhos[Math.floor(Math.random() * tamanhos.length)];
  let codigo = '';
  for (let i = 0; i < tamanhoSelecionado; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}
