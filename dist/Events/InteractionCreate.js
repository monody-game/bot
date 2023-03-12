import { Commands } from "../Commands/CommandList.js";
export default (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};
const handleSlashCommand = async (client, interaction) => {
    const command = Commands.find((c) => c.name === interaction.commandName);
    if (!command) {
        await interaction.followUp({
            content: "Oh oh, une erreur est survenue ...",
        });
        return;
    }
    console.log(`User ${interaction.user.id} used command ${command.name}`);
    command.callback(interaction);
};
//# sourceMappingURL=InteractionCreate.js.map