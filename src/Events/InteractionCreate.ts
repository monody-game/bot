import { Client, CommandInteraction, Interaction } from "discord.js";
import { Commands } from "../Commands/CommandList.js";
import { debug, error } from "@moon250/yalogger";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction,
): Promise<void> => {
  const command = Commands.find((c) => c.name === interaction.commandName);

  if (!command) {
    error(
      `User ${interaction.user.id} tried to use command ${interaction.commandName}, but it is not defined in command list`,
    );
    await interaction.followUp({
      content: "Oh oh, une erreur est survenue ...",
    });
    return;
  }

  debug(`User ${interaction.user.id} used command ${command.name}`);

  await command.callback(interaction);
};
