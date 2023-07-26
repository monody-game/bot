import { EmbedBuilder } from "discord.js";
import config from "./config.js";

export class Embeds {
  static iconUrl = config.monody.url + "/images/monody_64.png";

  public static base(content: string, title: string = "Monody"): EmbedBuilder {
    return new EmbedBuilder()
      .setColor(config.colors.monody)
      .setTitle(title)
      .setDescription(content)
      .setFooter({ text: this.getFooter(), iconURL: this.iconUrl });
  }

  public static image(url: string, title: string = "Monody"): EmbedBuilder {
    return new EmbedBuilder()
      .setColor(config.colors.monody)
      .setTitle(title)
      .setImage(url)
      .setFooter({ text: this.getFooter(), iconURL: this.iconUrl });
  }

  public static error(
    content: string,
    title: string = "Oh oh ...",
  ): EmbedBuilder {
    return new EmbedBuilder()
      .setColor(config.colors.error)
      .setTitle(title)
      .setDescription(content)
      .setFooter({ text: this.getFooter(), iconURL: this.iconUrl });
  }

  public static getFooter(): string {
    return `Monody ${new Date().getFullYear()} - Tous droits réservés`;
  }
}
