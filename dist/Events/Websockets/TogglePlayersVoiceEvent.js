import { error } from "@moon250/yalogger";
import config from "../../Utils/config.js";
import { client as redisClient } from "../../Redis/Connection.js";
export default {
    event: "game.voice.toggle",
    async callback(client, event) {
        const guild = client.guilds.cache.get(config.guild);
        const payload = event.data.payload;
        if (!guild) {
            error(`Guild ${config.guild} not found`);
            return;
        }
        const channelList = JSON.parse((await redisClient.get("bot:game:channels")) ?? "{}");
        const channelId = channelList[payload.game_id];
        const discordData = JSON.parse((await redisClient.get(`game:${payload.game_id}:discord`)) ?? "{}");
        const gameData = JSON.parse((await redisClient.get(`game:${payload.game_id}`)));
        const voiceChannel = (await guild.channels.cache.get(channelId));
        let voiceState = true;
        if (discordData["voice_state"] &&
            typeof discordData["voice_state"] === "boolean") {
            voiceState = !discordData["voice_state"];
        }
        for (const member of voiceChannel.members.values()) {
            if (gameData.dead_users.includes(discordData.members[member.id])) {
                await member.voice.setMute(true);
                continue;
            }
            await member.voice.setMute(voiceState);
        }
        discordData["voice_state"] = voiceState;
        await redisClient.set(`game:${payload.game_id}:discord`, JSON.stringify(discordData));
    },
};
