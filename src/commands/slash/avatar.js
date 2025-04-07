const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");



module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Mostra tu avatar o de otro usuario")
    .addMentionableOption((option) =>
      option.setName("user").setDescription("Usuario a ver el avatar")
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const embed = new EmbedBuilder();

    if (!user) {
      embed
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTitle(`Avatar de ${interaction.user.username}`)
        .setURL(`${interaction.user.displayAvatarURL({ size: 512})}`)
        .setImage(interaction.user.displayAvatarURL({ size: 512}));

      await interaction.reply({ embeds: [embed] });
    } else if (user) {
      embed
        .setAuthor({
          name: user.username,
          iconURL: user.displayAvatarURL(),
        })
        .setTitle(`Avatar de ${user.username}`)
        .setURL(`${user.displayAvatarURL({ size: 512})}`)
        .setImage(user.displayAvatarURL({ size: 512}));

      await interaction.reply({ embeds: [embed] });
    }
  },
};
