const { Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const fg = require("figlet");

module.exports = (client) => {
  console.log(fg.textSync(`PREFIX HANDLER`));

  client.prefixCommands = new Collection();
  const commandsPath = path.join(__dirname, "../commands/prefix");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("name" in command && "execute" in command) {
      client.prefixCommands.set(command.name, command);
      console.log(`[Prefix Handler] Comando cargado: ${command.name} [✔️ ]`);
    } else {
      console.error(
        `[Prefix Handler] Comando no cargado : ${command.name} [❌]`
      );
    }
  }

  console.log("\n[Prefix Handler] ====== Resumen de Comandos ======");
  console.log(
    `[Prefix Handler] Total de comandos cargados: ${client.prefixCommands.size}`
  );
  console.log("[Prefix Handler] ================================\n");
};
