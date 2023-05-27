import {
  ChatInputApplicationCommandData,
  CommandInteraction,
} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
  callback: (interaction: CommandInteraction) => Promise<void>;
}
