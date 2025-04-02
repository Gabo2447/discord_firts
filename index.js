const {
  Client,
  Collection,
  REST,
  Routes,
} = require("discord.js");
require("dotenv").config();

const client = new Client({intents: [8]});

const rest = new REST().setToken(process.env.token);
client.commands = new Collection();
const commandHandler = require("./src/handlers/commandHandler");
const eventHandler = require("./src/handlers/eventHandler");

// Registrar eventos primero
eventHandler(client);
commandHandler(client);

// Deploy de comandos después de que el bot esté listo
client.on('ready', () => {
  (async () => {
      try {
          console.log(`Iniciando actualización de ${client.commands.size} comandos (/)`);
          const commands = client.commands.map(command => command.data.toJSON());
          const data = await rest.put(
              Routes.applicationCommands(process.env.clientId),
              { body: commands }
          );
          console.log(`Comandos actualizados exitosamente: ${data.length}`);
      } catch (error) {
          console.error(error);
      }
  })();
});

client.login(process.env.token);