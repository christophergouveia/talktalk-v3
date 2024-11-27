"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomNicks = exports.randomNicks = void 0;
exports.randomNicks = {
    'Jacaré Anônimo': 'Alligator',
    'Tamiá Anônimo': 'Chipmunk',
    'Esquilo Anônimato': 'Gopher',
    'Ligre Anônimo': 'Liger',
    'Quagga Anônimo': 'Quagga',
    'Tamanduá Anônimo': 'Anteater',
    'Chupacabra Anônimo': 'Chupacabra',
    'Urso-pardo Anônimo': 'Grizzly',
    'Lhama Anônima': 'Llama',
    'Coelho Anônimo': 'Rabbit',
    'Tatu Anônimo': 'Armadillo',
    'Corvo-marinho Anônimo': 'Cormorant',
    'Porco-espinho Anônimo': 'Hedgehog',
    'Peixe-boi Anônimo': 'Manatee',
    'Guaxinim Anônimo': 'Raccoon',
    'Auroque Anônimo': 'Auroch',
    'Coiote Anônimo': 'Coyote',
    'Hipopótamo Anônimo': 'Hippo',
    'Visão Anônima': 'Mink',
    'Rinoceronte Anônimo': 'Rhino',
    'Axolotl Anônimo': 'Axolotl',
    'Corvo Anônimo': 'Crow',
    'Hiena Anônima': 'Hyena',
    'Macaco Anônimo': 'Monkey',
    'Ovelha Anônima': 'Sheep',
    'Texugo Anônimo': 'Badger',
    'Dingo Anônimo': 'Dingo',
    'Íbex Anônimo': 'Ibex',
    'Alce Anônimo': 'Moose',
    'Musaranho Anônimo': 'Shrew',
    'Morcego Anônimo': 'Bat',
    'Dinossauro Anônimo': 'Dinosaur',
    'Ifrit Anônimo': 'Ifrit',
    'Narval Anônimo': 'Narwhal',
    'Gambá Anônimo': 'Skunk',
    'Castor Anônimo': 'Beaver',
    'Golfinho Anônimo': 'Dolphin',
    'Iguana Anônima': 'Iguana',
    'Orangotango Anônimo': 'Orangutan',
    'Esquilo Anônimo': 'Squirrel',
    'Búfalo Anônimo': 'Buffalo',
    'Pato Anônimo': 'Duck',
    'Chacal Anônimo': 'Jackal',
    'Lontra Anônima': 'Otter',
    'Tigre Anônimo': 'Tiger',
    'Camelo Anônimo': 'Camel',
    'Elefante Anônimo': 'Elephant',
    'Canguru Anônimo': 'Kangaroo',
    'Panda Anônimo': 'Panda',
    'Tartaruga Anônima': 'Turtle',
    'Capivara Anônima': 'Capybara',
    'Furão Anônimo': 'Ferret',
    'Coala Anônimo': 'Koala',
    'Pinguim Anônimo': 'Penguin',
    'Morsa Anônima': 'Walrus',
    'Camaleão Anônimo': 'Chameleon',
    'Raposa Anônima': 'Fox',
    'Kraken Anônimo': 'Kraken',
    'Ornitorrinco Anônimo': 'Platypus',
    'Lobo Anônimo': 'Wolf',
    'Guepardo Anônimo': 'Cheetah',
    'Sapo Anônimo': 'Frog',
    'Lêmure Anônimo': 'Lemur',
    'Abóbora Anônima': 'Pumpkin',
    'Carcaju Anônimo': 'Wolverine',
    'Chinchila Anônima': 'Chinchilla',
    'Girafa Anônima': 'Giraffe',
    'Leopardo Anônimo': 'Leopard',
    'Python Anônimo': 'Python',
    'Wombat Anônimo': 'Wombat',
};
let RandomNicks = /** @class */ (function () {
    function RandomNicks() {
    }
    RandomNicks.get = function () {
        let nicks = Object.keys(exports.randomNicks);
        let randomIndex = Math.floor(Math.random() * nicks.length);
        return nicks[randomIndex];
    };
    RandomNicks.getEnglish = function (nick) {
        return exports.randomNicks[nick];
    };
    return RandomNicks;
}());
exports.RandomNicks = RandomNicks;
