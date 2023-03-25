import { error } from "@moon250/yalogger";
import config from "../../Utils/config.js";
import { client as redisClient } from "../../Redis/Connection.js";
export default {
    event: "game.voice.allow",
    async callback(client, event) {
        const guild = client.guilds.cache.get(config.guild);
        const payload = event.data.payload;
        if (!guild) {
            error(`Guild ${config.guild} not found`);
            return;
        }
        const user = await guild.members.fetch(payload.discord_id);
        const channelList = JSON.parse((await redisClient.get("bot:game:channels")) ?? "{}");
        const channelId = channelList[payload.game_id];
        const voiceChannel = (await guild.channels.cache.get(channelId));
        if (!voiceChannel) {
            return;
        }
        await voiceChannel.permissionOverwrites.edit(user.id, {
            ViewChannel: true,
            Connect: true,
        });
    },
};
