const {
  Client,
  Collection,
  Message,
  GatewayIntentBits
} = require("discord.js");
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
    GatewayIntentBits.GuildIntegrations
  ]
});

const commandHandler = require("./src/handlers/commandHandler");
const prefixHandler = require("./src/handlers/prefixHandler");
const { loadEvent } = require("./src/handlers/eventHandler");

// Registrar eventos primero
loadEvent(client);
prefixHandler(client);
commandHandler(client);

client.login(process.env.token);