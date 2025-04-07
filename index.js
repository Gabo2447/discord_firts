const { Client, Collection, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildIntegrations,
  ],
});

// Inicializa client.commands como una colección
client.commands = new Collection();

// Carga los handlers (asegúrate de que el archivo commandHandler.js esté configurado correctamente)
require("./src/handlers/eventHandler")(client);
require("./src/handlers/commandHandler")(client);
require("./src/handlers/prefixHandler")(client);

client.login(process.env.TOKEN);