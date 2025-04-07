const { ColorTemplate } = require("@gabo2447/template");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Muestra la información del usuario")
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("El usuario del que quieres ver la información")
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("usuario") || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    // Formatear fechas
    const accountCreationDate = `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`;
    const serverJoinDate = member
      ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`
      : "N/A";

    // Obtener roles del usuario
    const roles = member?.roles.cache
      .filter((role) => role.id !== interaction.guild.id) // Excluir el rol predeterminado (@everyone)
      .map((role) => `<@&${role.id}>`) // Formatear como menciones de roles
      .slice(0, 5) // Mostrar un máximo de 5 roles
      .join(", ") || "Ninguno";

    const extraRolesCount = member?.roles.cache.size - 6; // Contar roles adicionales
    const rolesDisplay = extraRolesCount > 0
      ? `${roles} y ${extraRolesCount} más...`
      : roles;

    const embed = new ColorTemplate()
      .cyanClaro()
      .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
      .setTitle(`📋 Información de ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addField([
        { name: "🆔 **ID del Usuario:**", value: user.id, inline: false },
        { name: "📛 **Apodo:**", value: member?.nickname || "N/A", inline: false },
        { name: "📅 **Cuenta Creada el:**", value: accountCreationDate, inline: false },
        { name: "📥 **Se Unió al Servidor el:**", value: serverJoinDate, inline: false },
        { name: "🎭 **Roles:**", value: rolesDisplay, inline: false },
      ])
      .setTimestamp()
      .setDescription(null)
      .setFooter(
        `Solicitado por ${interaction.user.username}`,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .build();

    try {
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error al enviar el mensaje de información del usuario:", error);
      await interaction.followUp({
        content: "Hubo un error al mostrar la información del usuario.",
        ephemeral: true,
      });
    }
  },
};
