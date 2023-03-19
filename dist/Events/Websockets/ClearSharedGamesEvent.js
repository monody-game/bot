import config from "../../Utils/config.js";
import { client as redisClient } from "../../Redis/Connection.js";
export default {
    event: "game.share.clear",
    async callback(client) {
        await clearSharedGame(client);
    },
};
export async function clearSharedGame(client) {
    const channel = client.channels.cache.get(config.channels.SHARE_GAME);
    const messages = await channel.messages.fetch({ limit: 50 });
    const shared = JSON.parse((await redisClient.get("bot:game:shared")) ?? "{}");
    for (const message of messages.values()) {
        if (!Object.values(shared).includes(message.id)) {
            await message.delete();
        }
    }
}
//# sourceMappingURL=ClearSharedGamesEvent.js.map