const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("El bot te saludara!"),

  async execute(interaction) {
    try {
      await interaction.reply("Hola!");
    } catch (error) {
      console.error("No se puede responder al mensaje.");
      await interaction.followUp("Hola!");
    }
  },
};
