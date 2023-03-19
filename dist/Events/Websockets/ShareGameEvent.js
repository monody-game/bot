import { Embeds } from "../../Utils/Embeds.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, } from "discord.js";
import config from "../../Utils/config.js";
import { client as redisClient } from "../../Redis/Connection.js";
import { clearSharedGame } from "./ClearSharedGamesEvent.js";
export default {
    event: "game.share",
    async callback(client, payload) {
        await clearSharedGame(client);
        const game = payload.data.payload;
        const channel = client.channels.cache.get(config.channels.SHARE_GAME);
        const embed = Embeds.base(`**${game.owner.username}** vous invite à rejoindre sa partie !`);
        const row = new ActionRowBuilder().addComponents(new ButtonBuilder()
            .setLabel("Rejoindre")
            .setURL(`${config.base}/game/${game.id}`)
            .setStyle(ButtonStyle.Link));
        const message = await channel.send({
            embeds: [embed],
            components: [row],
        });
        const shared = JSON.parse((await redisClient.get("bot:game:shared")) ?? "{}");
        shared[game.id] = message.id;
        await redisClient.set("bot:game:shared", JSON.stringify(shared));
    },
};
//# sourceMappingURL=ShareGameEvent.js.map