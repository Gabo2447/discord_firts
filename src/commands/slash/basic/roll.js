const { SlashCommandBuilder } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
  .setName("roll")
  .setDescription("numeros ramdoms del 1 al 100")
  .addIntegerOption((option) => option.setName("min").setDescription("Minimo").setRequired(false))
  .addIntegerOption((option) => option.setName("max").setDescription("Maximo").setRequired(false)),

  async execute(interaction) {
    const min = interaction.options.getInteger("min") || 1;
    const max = interaction.options.getInteger("max") || 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    try {
      await interaction.reply(`El numero aleatorio es: ${randomNumber}`);
    } catch (error) {
      await interaction.followUp(`El numero aleatorio es: ${randomNumber}`);
      console.error(`Error al enviar el numero`)
    }
  }
}