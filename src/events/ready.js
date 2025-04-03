const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`✅ ${client.user.tag} conectado`); 


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
