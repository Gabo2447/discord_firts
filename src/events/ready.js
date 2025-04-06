const { Events, ActivityType } = require("discord.js");
const deployCommands = require("../deploy-commands");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`✅ ${client.user.tag} conectado`); 
    // Deploy Command
    deployCommands(client.commands)
    // Configurar presencia del bot
    client.user.setPresence({
      activities: [{
        name: "Roblox",
        type: ActivityType.Playing,
      }],
      status: "online"
    });
  },
};
