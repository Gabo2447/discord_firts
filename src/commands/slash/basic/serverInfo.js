// Comandos slash
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test') // Nombre del comando
    .setDescription('El bot responde con "Prueba"!'), // Descripción del comando

  async execute(interaction) {
    await interaction.reply('¡Prueba!');
  }
};