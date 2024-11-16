const fs = require('fs');
const url = "https://anonymous-animals.azurewebsites.net/animal/";
const { randomNicks, RandomNicks } = require('./app/utils/strings/randomNicks');

async function downloadAvatars() {
    for (const animal in randomNicks) {
        const animalNameEnglish = RandomNicks.getEnglish(animal);
        const imageUrl = `${url}${animalNameEnglish.toLowerCase()}`;
        if(!fs.existsSync("./public/images/avatars")) {
            fs.mkdirSync("./public/images/avatars");
        }
        try {
            const response = await fetch(imageUrl);
            const buffer = await response.arrayBuffer();
            fs.writeFileSync(`./public/images/avatars/${animalNameEnglish.toLowerCase()}.png`, Buffer.from(buffer));
            console.log(`${animalNameEnglish.toLowerCase()}.png salvo!`);
        } catch (error) {
            console.error(`Error fetching ${animalNameEnglish.toLowerCase()}: ${error}`);
        }
    }
}

downloadAvatars();
