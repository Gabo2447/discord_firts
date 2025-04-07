const { Events } = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;

    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    const cmd = client.prefixCommands.get(command);

    if (!cmd) return;

    try {
      cmd.execute(message, args, client);
    } catch (error) {
      console.error("Error ejecutando comando:", error);
      message.reply('Hubo un error ejecutando el comando.');
    }
  },
};
