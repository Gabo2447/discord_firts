const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Muestra el ping del bot y el API"),
  async execute(interaction) {
    // Respuesta inicial para calcular el tiempo
    await interaction.deferReply();
    const reply = await interaction.fetchReply();
    const botPing = reply.createdTimestamp - interaction.createdTimestamp; // Calcular el ping del bot

    // Obtener el ping de la API
    const apiPing = Math.round(interaction.client.ws.ping);

    // Editar la respuesta con los datos calculados
    await interaction.editReply(
      `🏓 Pong!\nBot Ping: ${botPing}ms\nAPI Ping: ${apiPing}ms`
    );
  },
};
