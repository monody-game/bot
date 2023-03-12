import { EmbedBuilder } from "discord.js";
import config from "./config.js";
export class Embeds {
    static base(content, title = "Monody") {
        return new EmbedBuilder()
            .setColor(config.color)
            .setTitle(title)
            .setDescription(content)
            .setFooter({
            text: `Monody ${new Date().getFullYear()} - Tous droits réservés`,
        });
    }
}
//# sourceMappingURL=Embeds.js.map