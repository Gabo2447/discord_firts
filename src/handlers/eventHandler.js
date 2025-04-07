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


module.exports = {
  async loadEvent(client) {
    console.log(fg.textSync(`EVENT HANDLER`))
    const commandsPath = path.join(__dirname, '../events'); // Directorio
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js")); // Nombre del archivo

    for (file of commandFiles) {
      const filePath = path.join(commandsPath, file); // Unir direcciones
      const event = require(filePath); // Requerir el archivo

      if (event.once) {
        client.once(event.name, (...args) =>
          event.execute(
            ...args,
            client,
            EmbedBuilder,
            ActionRowBuilder,
            ButtonBuilder,
            StringSelectMenuBuilder,
            Message
          )
        );
      } else {
        client.on(event.name, (...args) =>
          event.execute(
            ...args,
            client,
            EmbedBuilder,
            ActionRowBuilder,
            ButtonBuilder,
            StringSelectMenuBuilder,
            Message
          )
        )
      }
      console.log(`[Event Handler] Evento cargado: ${event.name}`)
    }
  },
};
