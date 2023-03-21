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

type Payload = {
  discord_id: Snowflake;
  game_id: string;
};

export default {
  event: "game.voice.allow",
  async callback(client: Client, event: EventPayload) {
    const guild = client.guilds.cache.get(config.guild);
    const payload = event.data.payload as Payload;

    if (!guild) {
      error(`Guild ${config.guild} not found`);
      return;
    }

    const user = await guild.members.fetch(payload.discord_id);
    const channelList = JSON.parse(
      (await redisClient.get("bot:game:channels")) ?? "{}"
    );
    const channelId: Snowflake = channelList[payload.game_id];

    const voiceChannel = (await guild.channels.cache.get(
      channelId
    )) as VoiceChannel;

    await voiceChannel.permissionOverwrites.edit(user.id, {
      ViewChannel: true,
      Connect: true,
    });
  },
};
