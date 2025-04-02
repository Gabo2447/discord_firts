const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    /**
     * 
     */
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Esto es un comando de prueba'),

    async execute(interaction) {
        try {
            await interaction.reply('Prueba!')
        } catch (error) {
            console.error('No se puede responder al mensaje.')
            await interaction.followUp('Prueba!');
        }
    }
}