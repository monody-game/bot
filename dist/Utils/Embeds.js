import { EmbedBuilder } from "discord.js";
import config from "./config.js";
export class Embeds {
    static base(content, title = "Monody") {
        return new EmbedBuilder()
            .setColor(config.color)
            .setTitle(title)
            .setDescription(content)
            .setFooter({
            text: this.getFooter(),
        });
    }
    static image(url, title = "Monody") {
        return new EmbedBuilder()
            .setColor(config.color)
            .setTitle(title)
            .setImage(url)
            .setFooter({ text: this.getFooter() });
    }
    static getFooter() {
        return `Monody ${new Date().getFullYear()} - Tous droits réservés`;
    }
}
//# sourceMappingURL=Embeds.js.map