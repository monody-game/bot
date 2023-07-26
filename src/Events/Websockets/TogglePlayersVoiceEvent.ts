import {
  Client,
  PermissionsBitField,
  ChannelType,
  Snowflake,
  VoiceChannel,
} from "discord.js";
import { error } from "@moon250/yalogger";
import config from "../../Utils/config.js";
import { EventPayload } from "../../Redis/RedisSubscriber.js";
import { client as redisClient } from "../../Redis/Connection.js";
import { type } from "os";

type Payload = {
  game_id: string;
  lock: boolean;
};

export default {
  event: "game.voice.toggle",
  callback: async function (client: Client, event: EventPayload) {
    const guild = client.guilds.cache.get(config.guild);
    const payload = event.data.payload as Payload;

    if (!guild) {
      error(`Guild ${config.guild} not found`);
      return;
    }

    const channelList = JSON.parse(
      (await redisClient.get("bot:game:channels")) ?? "{}",
    );
    const channelId: Snowflake = channelList[payload.game_id];
    const discordData = JSON.parse(
      (await redisClient.get(`game:${payload.game_id}:discord`)) ?? "{}",
    );
    const gameData = JSON.parse(
      (await redisClient.get(`game:${payload.game_id}`)) as string,
    );

    const voiceChannel = guild.channels.cache.get(channelId) as VoiceChannel;

    for (const member of voiceChannel.members.values()) {
      if (gameData.dead_users.includes(discordData.members[member.id])) {
        await member.voice.setMute(true);
        continue;
      }

      await member.voice.setMute(payload.lock);
    }
  },
};
