import { Client, Snowflake, VoiceChannel } from "discord.js";
import { EventPayload } from "../../Redis/RedisSubscriber.js";
import { client as redis } from "../../Redis/Connection.js";
import { debug } from "@moon250/yalogger";

type ClearVocalChannelPayload = {
  game_id: string;
  channel_id: Snowflake;
};

export default {
  event: "game.vocal.clear",
  async callback(client: Client, event: EventPayload) {
    const payload = event.data.payload as ClearVocalChannelPayload;
    const channel = (await client.channels.fetch(
      payload.channel_id
    )) as VoiceChannel;

    const storedData = JSON.parse(
      (await redis.get(`bot:game:channels`)) as string
    );

    delete storedData[payload.game_id];

    await redis.set(`bot:game:channels`, JSON.stringify(storedData));

    if (channel) {
      await channel.delete("Game was deleted");
    }

    return "HAHA !";
  },
};
