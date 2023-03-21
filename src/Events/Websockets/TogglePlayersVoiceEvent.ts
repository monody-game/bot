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
};

export default {
  event: "game.voice.toggle",
  async callback(client: Client, event: EventPayload) {
    const guild = client.guilds.cache.get(config.guild);
    const payload = event.data.payload as Payload;

    if (!guild) {
      error(`Guild ${config.guild} not found`);
      return;
    }

    const channelList = JSON.parse(
      (await redisClient.get("bot:game:channels")) ?? "{}"
    );
    const channelId: Snowflake = channelList[payload.game_id];
    const discordData = JSON.parse(
      (await redisClient.get(`game:${payload.game_id}:discord`)) ?? "{}"
    );

    const voiceChannel = (await guild.channels.cache.get(
      channelId
    )) as VoiceChannel;

    let voiceState = true;

    if (
      discordData["voice_state"] &&
      typeof discordData["voice_state"] === "boolean"
    ) {
      voiceState = !discordData["voice_state"];
    }

    for (const member of voiceChannel.members.values()) {
      await member.voice.setMute(voiceState);
    }

    discordData["voice_state"] = voiceState;

    await redisClient.set(
      `game:${payload.game_id}:discord`,
      JSON.stringify(discordData)
    );
  },
};
