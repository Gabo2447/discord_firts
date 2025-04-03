const path = require('path');
const fs = require('fs');
const fg = require('figlet');

module.exports = (client) => {
    console.log(fg.textSync('EVENT HANDLER'))
    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        console.log(`Evento cargado: ${event.name}`)
        
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
};