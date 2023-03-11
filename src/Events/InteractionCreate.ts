import { Client, CommandInteraction, Interaction } from "discord.js";
import { Commands } from "../Commands/CommandList";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const command = Commands.find((c) => c.name === interaction.commandName);

  if (!command) {
    await interaction.followUp({
      content: "Oh oh, une erreur est survenue ...",
    });
    return;
  }

  console.log(`User ${interaction.user.id} used command ${command.name}`)

  command.callback(interaction);
};
