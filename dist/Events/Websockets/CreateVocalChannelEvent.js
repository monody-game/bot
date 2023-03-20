import { PermissionsBitField, ChannelType } from "discord.js";
import { error } from "@moon250/yalogger";
import config from "../../Utils/config.js";
import { client as redisClient } from "../../Redis/Connection.js";
export default {
    event: "game.vocal.create",
    async callback(client, event) {
        const guild = client.guilds.cache.get(config.guild);
        const payload = event.data.payload;
        if (!guild) {
            error(`Guild ${config.guild} not found`);
            return;
        }
        const user = await guild.members.fetch(payload.owner.discord_id);
        const game = JSON.parse(await redisClient.get(`game:${payload.game_id}`) ?? "{}");
        const channel = await guild.channels.create({
            name: `Partie de ${payload.owner.username}`,
            type: ChannelType.GuildVoice,
            parent: config.channels.GAME_CATEGORY,
            userLimit: payload.size,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: user,
                    allow: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ViewChannel]
                }
            ]
        });
        game.discord = {
            guild: config.guild,
            voice_channel: channel.id
        };
        await redisClient.set(`game:${payload.game_id}`, JSON.stringify({
            ...game,
            ...(JSON.parse(await redisClient.get(`game:${payload.game_id}`) ?? "{}"))
        }));
    },
};
