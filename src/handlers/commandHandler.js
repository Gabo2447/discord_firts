const fs = require("node:fs");
const path = require("node:path");

module.exports = (client) => {
  const commandsPath = path.join(__dirname, "../commands/slash");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (!command) {
      console.error(`Error al cargar el comando: ${file}`);
      continue;
    }

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
      console.log(`Comando: ${command.data.name} ✓`);
    } else {
      console.log(`Comando: ${command.data.name} ❌ Falta data o execute`);
    }
  }
};
