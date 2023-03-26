import { Client } from "discord.js";
import { client as redis } from "../Redis/Connection.js";
import { apiFetch } from "../Utils/Fetch.js";
import {error} from "@moon250/yalogger";

export default (client: Client) => {
  client.on("voiceStateUpdate", async (oldState, newState) => {
    const channelList = JSON.parse(
      (await redis.get("bot:game:channels")) ?? "{}"
    );

    if (oldState.channelId === newState.channelId) return;

    if (oldState.channelId === null && newState.channelId !== null) {
      await newState.setMute(false);
    }

    if (
      newState.channelId &&
      Object.values(channelList).includes(newState.channelId)
    ) {
      try {
        await apiFetch("/game/vocal/joined", "POST", {
          discord_id: newState.id,
        });
      } catch (e) {
        error(e.toString())
      }
    }
  });
};
