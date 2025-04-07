const { EmbedTemplate, ColorTemplate } = require("@gabo2447/template");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Muestra la lista de comandos disponibles"),

  async execute(interaction) {
    const commands = interaction.client.commands;
    const user = interaction.user;

    const embed = new ColorTemplate()
      .verdeClaro()
      .setAuthor(user.username, user.displayAvatarURL())
      .setTitle(`|--| **COMANDOS ${interaction.client.user.username}** |--|`)
      .setDescription(
        "Holi! Soy Aradir, sino sabes mis comandos y mi funcion solamente ve abajo de aqui y revisa mi **informacion**! :3"
      )
      .setImage(
        "https://i.pinimg.com/originals/d6/6a/d1/d66ad1a0ce0fc09370424075125b06b7.gif"
      )
      .setTimestamp()
      .setFooter(
        `Comandos disponibles: ${commands.size} | ${interaction.client.user.username}`,
        interaction.client.user.displayAvatarURL()
      )
      .build();

    // Crear los campos para cada comando
    const fields = [];
    commands.forEach((command) => {
      fields.push({
        name: `🤖 /${command.data.name}`,
        value: command.data.description,
        inline: false,
      });
    });

    embed.addFields(fields);

    try {
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error al enviar el mensaje de ayuda:", error);
      await interaction.reply({
        content: "Hubo un error al mostrar la lista de comandos.",
        ephemeral: true,
      });
    }
  },
};
