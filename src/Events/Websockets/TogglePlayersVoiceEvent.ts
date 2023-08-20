import { Client, Snowflake, VoiceChannel } from "discord.js";
import { debug, error } from "@moon250/yalogger";
import config from "../../Utils/config.js";
import { EventPayload } from "../../Redis/RedisSubscriber.js";
import { client as redisClient } from "../../Redis/Connection.js";

type Payload = {
  game_id: string;
  lock: boolean;
};

type ChannelList = {
  [key: string]: Snowflake;
};

type DiscordData = {
  guild: Snowflake;
  voice_channel: Snowflake;
  members: {
    [key: Snowflake]: string;
  };
  muted: boolean;
};

export default {
  event: "game.voice.toggle",
  callback: async function (client: Client, event: EventPayload) {
    const guild = client.guilds.cache.get(config.guild);
    const payload = event.data.payload as Payload;

    debug(`Voice is supposed to toggle to : muted = ${payload.lock}`);

    if (!guild) {
      error(`Guild ${config.guild} not found`);
      return;
    }

    const channelList = await redisClient.get<ChannelList>("bot:game:channels");
    const channelId = channelList[payload.game_id] as Snowflake;
    const discordData = await redisClient.get<DiscordData>(
      `game:${payload.game_id}:discord`,
    );
    const gameData = await redisClient.get(`game:${payload.game_id}`);

    discordData.muted = payload.lock;

    await redisClient.set(`game:${payload.game_id}:discord`, discordData);

    const voiceChannel = guild.channels.cache.get(channelId) as VoiceChannel;

    for (const member of voiceChannel.members.values()) {
      const userId = discordData.members[member.id] as string;

      if (
        Object.keys(gameData.dead_users).includes(userId) &&
        gameData.ended === false
      ) {
        await member.voice.setMute(true);
        continue;
      }

      await member.voice.setMute(payload.lock);
    }
  },
};
