const animais = [
  'Leão', 'Tigre', 'Elefante', 'Girafa', 'Panda',
  'Koala', 'Zebra', 'Macaco', 'Golfinho', 'Pinguim',
  'Canguru', 'Urso', 'Lobo', 'Raposa', 'Coruja',
  'Tucano', 'Jaguar', 'Guepardo', 'Rinoceronte', 'Hipopótamo'
];

const adjetivos = [
  'Feliz', 'Alegre', 'Esperto', 'Ágil', 'Veloz',
  'Calmo', 'Gentil', 'Forte', 'Sábio', 'Bravo',
  'Amigável', 'Curioso', 'Divertido', 'Enérgico', 'Pacífico'
];

export function gerarNomeAnimalAleatorio(): string {
  const animal = animais[Math.floor(Math.random() * animais.length)];
  const adjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
  return `${adjetivo}${animal}`;
} 