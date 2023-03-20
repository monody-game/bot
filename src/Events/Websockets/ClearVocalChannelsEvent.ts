import { Client, Snowflake, VoiceChannel } from "discord.js";
import { EventPayload } from "../../Redis/RedisSubscriber.js";

type ClearVocalChannelPayload = {
  channel_id: Snowflake;
};

export default {
  event: "game.vocal.clear",
  async callback(client: Client, event: EventPayload) {
    const payload = event.data.payload as ClearVocalChannelPayload;
    const channel = (await client.channels.fetch(
      payload.channel_id
    )) as VoiceChannel;

    if (channel) {
      await channel.delete("Game was deleted");
    }
  },
};
