const { SlashCommandBuilder } = require("discord.js");
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invita al bot a tu servidor!'),

  async execute(interaction) {
    const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${process.env.clientId}`;
    try {
      await interaction.reply(`Por supuesto que puedes invitarme! Aqui tienes el link:\n ${inviteLink}`);
    } catch (error) {
      await interaction.followUp(`Por supuesto que puedes invitarme! Aqui tienes el link:\n ${inviteLink}`);
    }
  }
}