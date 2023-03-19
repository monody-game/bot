import { Client, Snowflake, TextChannel } from "discord.js";
import config from "../../Utils/config.js";
import { client as redisClient } from "../../Redis/Connection.js";

export default {
  event: "game.share.clear",
  async callback(client: Client) {
    await clearSharedGame(client);
  },
};

export async function clearSharedGame(client: Client) {
  const channel = client.channels.cache.get(
    config.channels.SHARE_GAME
  ) as TextChannel;
  const messages = await channel.messages.fetch({ limit: 50 });
  const shared: { [key: string]: Snowflake } = JSON.parse(
    (await redisClient.get("bot:game:shared")) ?? "{}"
  );

  for (const message of messages.values()) {
    if (!Object.values(shared).includes(message.id)) {
      await message.delete();
    }
  }
}
