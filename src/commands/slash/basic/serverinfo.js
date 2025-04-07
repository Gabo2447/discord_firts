const { ColorTemplate } = require("@gabo2447/template");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Muestra la información del servidor!"),

  async execute(interaction) {
    const embed = new ColorTemplate()
      .orange()
      .setAuthor(interaction.guild.name, interaction.guild.iconURL())
      .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024 }))
      .setDescription(
        "Esta es la información del servidor! :3"
      )
      .addField([
        {
          name: `💻 **Nombre del servidor:**`,
          value: interaction.guild.name,
        },
        {
          name: `📄 **ID del servidor:**`,
          value: interaction.guild.id,
        },
        {
          name: `🤖 **Dueño del servidor:**`,
          value: `<@${interaction.guild.ownerId}>`,
        },
        {
          name: `🫂 **Miembros:**`,
          value: `${interaction.guild.memberCount} miembros`,
        },
        {
          name: `👑 **Creado el:**`,
          value: `<t:${Math.floor(
            interaction.guild.createdTimestamp / 1000
          )}:R>`,
        },
        {
          name: `🗺️ **Región del servidor:**`,
          value: interaction.guild.preferredLocale.replace(/-/g, " "),
        },
        {
          name: `📘 **Canales de texto:**`,
          value: `${
            interaction.guild.channels.cache.filter((c) => c.type === 0).size
          }`,
        },
        {
          name: `🗣️ **Canales de voz:**`,
          value: `${
            interaction.guild.channels.cache.filter((c) => c.type === 2).size
          }`,
        },
        {
          name: `🧠 **Roles:**`,
          value: `${interaction.guild.roles.cache.size}`,
        },
      ])
      .setImage(interaction.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle(
        `|--| **INFORMACION DEL SERVIDOR ${interaction.guild.name}** |--|`
      )
      
      .setTimestamp()
      .setFooter(
        `ID: ${interaction.guild.id}`,
        interaction.guild.iconURL({ dynamic: true })
      )
      .build();

    try {
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error al enviar el mensaje de información del servidor:");
      await interaction.followUp({ embeds: [embed] });
    }
  },
};
