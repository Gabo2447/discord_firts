const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @returns
   */
  data: new SlashCommandBuilder()
  .setName('say')
  .setDescription('Repite todo lo que le digas')
  .addStringOption(option => option.setName('text').setDescription('Ingresa el texto que quieras que diga el bot!').setRequired(true)),

  async execute(interaction) {
    const msg = interaction.options.getString('text');
    try {
      interaction.reply(msg);
    } catch (error) {
      interaction.followUp(msg);
    }
  }
}