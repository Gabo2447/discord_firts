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

client.login(process.env.token);