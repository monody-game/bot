import { EmbedBuilder } from "discord.js";
import config from "./config.js";
class Embeds {
    static iconUrl = config.monody.url + "/images/monody_64.png";
    static base(content, title = "Monody") {
        return new EmbedBuilder()
            .setColor(config.colors.monody)
            .setTitle(title)
            .setDescription(content)
            .setFooter({ text: this.getFooter(), iconURL: this.iconUrl });
    }
    static image(url, title = "Monody") {
        return new EmbedBuilder()
            .setColor(config.colors.monody)
            .setTitle(title)
            .setImage(url)
            .setFooter({ text: this.getFooter(), iconURL: this.iconUrl });
    }
    static error(content, title = "Oh oh ...") {
        return new EmbedBuilder()
            .setColor(config.colors.error)
            .setTitle(title)
            .setDescription(content)
            .setFooter({ text: this.getFooter(), iconURL: this.iconUrl });
    }
    static getFooter() {
        return `Monody ${new Date().getFullYear()} - Tous droits réservés`;
    }
}
export { Embeds };
