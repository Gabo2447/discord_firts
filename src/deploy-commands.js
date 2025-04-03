const { REST, Routes } = require("discord.js");
require("dotenv").config();

async function deployCommands(commands) {
  try {
    const rest = new REST().setToken(process.env.token);
    console.log(`Inicializando actualización de ${commands.size} comandos (/)`);

    const commandsData = commands.map((command) => command.data.toJSON());

    const data = await rest.put(
      Routes.applicationCommands(process.env.clientId),
      { body: commandsData }
    );

    console.log(`Comandos actualizados: ${data.length}`);
    return true;
  } catch (error) {
    console.error('Error al actualizar comandos:', error);
    return false;
  }
}

module.exports = deployCommands;
