import { EmbedBuilder } from "discord.js";
import config from "./config.js";

export class Embeds {
  static base(content: string, title: string = "Monody"): EmbedBuilder {
    return new EmbedBuilder()
      .setColor(config.color)
      .setTitle(title)
      .setDescription(content)
      .setFooter({
        text: this.getFooter(),
      });
  }

  static image(url: string, title: string = "Monody"): EmbedBuilder {
    return new EmbedBuilder()
      .setColor(config.color)
      .setTitle(title)
      .setImage(url)
      .setFooter({ text: this.getFooter() });
  }

  static getFooter(): string {
    return `Monody ${new Date().getFullYear()} - Tous droits réservés`;
  }
}
