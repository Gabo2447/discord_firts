const { Events, MessageFlags, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @returns 
     */
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return; // Verificar si es un comando slash
        const command = interaction.client.commands.get(interaction.commandName); // Extraer nombre del comando

        if (!command) { // Verificar si 'command' tiene el comando
            console.error(`Comando no encontrado o no ha sido encontrado. ${interaction.commandName}`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: `Error al intentar ejecutar ${interaction.commandName}`, flags: MessageFlags.Ephemeral });
            } else await interaction.replied({ content: `Error al intentar ejecutar ${interaction.commandName0}`, flags: MessageFlags.Ephemeral });
        }
    }
}