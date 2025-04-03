const fs = require("node:fs");
const path = require("node:path");
const fg = require('figlet');

module.exports = (client) => {
  console.log(fg.textSync(`COMMAND HANDLER`)); // TITULO DEL COMMAND HANDLER
  const commandsPath = path.join(__dirname, "../commands/slash");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) { // Bucle para ir en archivo en archivo
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (!command) { // Si command no tiene nada salta error
      console.error(`Error al cargar el comando: ${file}`);
      continue;
    }

    if ("data" in command && "execute" in command) { // Si falta data o execute salta error y si esta todo sale todo correcto
      client.commands.set(command.data.name, command);
      console.log(`Comando: ${command.data.name} [ ✔️ ]`);
    } else {
      console.log(`Comando: ${command.data.name} [ ❌ ] (IMPORTANTE: FALTA DATA O EXECUTE)`);
    }
  }
};
