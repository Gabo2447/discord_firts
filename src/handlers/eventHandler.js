const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  Message
} = require("discord.js");
const path = require("node:path");
const fs = require("node:fs");
const fg = require('figlet');

module.exports = (client) => {
  console.log(fg.textSync("EVENT HANDLER"));
  const eventsPath = path.join(__dirname, "../events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  let loadedEvents = 0; // Contador de eventos cargados

  for (const file of eventFiles) {
    const event = require(`${eventsPath}/${file}`);
    if (event.name && typeof event.execute === "function") {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
      console.log(`[Event Handler] Evento cargado: ${event.name} [✔️ ]`);
      loadedEvents++;
    } else {
      console.warn(
        `[Event Handler] Advertencia: El archivo ${file} no tiene las propiedades "name" o "execute".`
      );
    }
  }

  console.log("\n[Event Handler] ====== Resumen de Eventos ======");
  console.log(`[Event Handler] Total de eventos cargados: ${loadedEvents}`);
  console.log("[Event Handler] ================================\n");
};
