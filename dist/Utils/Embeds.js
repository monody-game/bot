import { EmbedBuilder } from "discord.js";
import config from "./config.js";
export class Embeds {
    static base(content, title = "Monody") {
        return new EmbedBuilder()
            .setColor(config.colors.monody)
            .setTitle(title)
            .setDescription(content)
            .setFooter({ text: this.getFooter() });
    }
    static image(url, title = "Monody") {
        return new EmbedBuilder()
            .setColor(config.colors.monody)
            .setTitle(title)
            .setImage(url)
            .setFooter({ text: this.getFooter() });
    }
    static error(content, title = "Oh oh ...") {
        return new EmbedBuilder()
            .setColor(config.colors.error)
            .setTitle(title)
            .setDescription(content)
            .setFooter({ text: this.getFooter() });
    }
    static getFooter() {
        return `Monody ${new Date().getFullYear()} - Tous droits réservés`;
    }
}
//# sourceMappingURL=Embeds.js.map