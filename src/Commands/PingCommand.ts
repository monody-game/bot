import { CommandInteraction } from "discord.js";
import { Command } from "./Command.js";

export default {
  name: "ping",
  description: "🏓 Ping pong !",
  async callback(interaction: CommandInteraction): Promise<void> {
    const reply = await interaction.reply({
      content: "Pong ?",
      ephemeral: true,
      fetchReply: true,
    });

    const diff = reply.createdTimestamp - interaction.createdTimestamp;
    await interaction.editReply(`🏓 Pong in ${diff}ms !`);
  },
} as Command;
