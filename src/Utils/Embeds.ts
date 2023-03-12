import { EmbedBuilder } from "discord.js";
import config from "./config.js";

export class Embeds {
  static base(content: string, title: string = "Monody"): EmbedBuilder {
    return new EmbedBuilder()
      .setColor(config.color)
      .setTitle(title)
      .setDescription(content)
      .setFooter({
        text: `Monody ${new Date().getFullYear()} - Tous droits réservés`,
      });
  }
}
