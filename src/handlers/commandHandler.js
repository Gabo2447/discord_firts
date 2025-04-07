const fs = require("node:fs");
const path = require("node:path");
const fg = require('figlet');
const { Collection } = require('discord.js');

module.exports = (client) => {
  console.log(fg.textSync(`COMMAND HANDLER`)); // TÍTULO DEL COMMAND HANDLER

  client.commands = new Collection();

  const commandsPath = path.join(__dirname, "../commands/slash");

  // Función recursiva para leer archivos en subcarpetas
  const getCommandFiles = (dir) => {
    let files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        files = files.concat(getCommandFiles(fullPath)); // Llama recursivamente si es una carpeta
      } else if (item.isFile() && item.name.endsWith(".js")) {
        files.push(fullPath); // Agrega el archivo si es un archivo .js
      }
    }

    return files;
  };

  const commandFiles = getCommandFiles(commandsPath);

  for (const file of commandFiles) { // Bucle para ir archivo por archivo
    const command = require(file);

    if (!command) { // Si el archivo no exporta nada, muestra un error
      console.error(`[COMMANDHANDLER] Error al cargar el comando: ${file}`);
      continue;
    }

    if ("data" in command && "execute" in command) { // Verifica que tenga "data" y "execute"
      client.commands.set(command.data.name, command);
      console.log(`[Command Handler] Comando: ${command.data.name} [✔️ ]`);
    } else {
      console.log(`[Command Handler] Comando: ${file} [ ❌ ] (IMPORTANTE: FALTA DATA O EXECUTE)`);
    }
  }

  console.log("\n[Command Handler] ====== Resumen de Comandos ======");
  console.log(
    `[Command Handler] Total de comandos cargados: ${client.commands.size}`
  );
  console.log("[Command Handler] ================================\n");
};
