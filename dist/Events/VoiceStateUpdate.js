import { client as redis } from "../Redis/Connection.js";
import { apiFetch } from "../Utils/Fetch.js";
export default (client) => {
    client.on("voiceStateUpdate", async (oldState, newState) => {
        const channelList = JSON.parse((await redis.get("bot:game:channels")) ?? "{}");
        if (newState.channelId &&
            Object.values(channelList).includes(newState.channelId)) {
            await apiFetch("/game/vocal/joined", "POST", {
                discord_id: newState.id,
            });
        }
    });
};