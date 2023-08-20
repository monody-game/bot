import { Client, Snowflake } from "discord.js";
import { client as redis } from "../Redis/Connection.js";
import { apiFetch } from "../Utils/Fetch.js";
import { error } from "@moon250/yalogger";

type ChannelList = {
  [key: string]: Snowflake;
};

export default (client: Client) => {
  client.on("voiceStateUpdate", async (oldState, newState) => {
    const channelList = await redis.get<ChannelList>("bot:game:channels");

    if (oldState.channelId === newState.channelId) return;

    if (
      oldState.channelId === null &&
      newState.channelId !== null &&
      !Object.values(channelList).includes(newState.channelId)
    ) {
      await newState.setMute(false);
    }

    if (
      newState.channelId &&
      Object.values(channelList).includes(newState.channelId)
    ) {
      const gameId = Object.keys(channelList).find(
        (key) => channelList[key] === newState.channelId,
      ) as string;
      const discordData = await redis.get(`game:${gameId}:discord`);

      await newState.setMute(discordData.muted ?? false);

      apiFetch("/game/vocal/joined", "POST", {
        discord_id: newState.id,
      }).catch((e) => error(e.toString()));
    }
  });
};
