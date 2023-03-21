import { client as redis } from "../../Redis/Connection.js";
export default {
    event: "game.vocal.clear",
    async callback(client, event) {
        const payload = event.data.payload;
        const channel = (await client.channels.fetch(payload.channel_id));
        const storedData = JSON.parse((await redis.get(`bot:game:channels`)));
        delete storedData[payload.game_id];
        await redis.set(`bot:game:channels`, JSON.stringify(storedData));
        if (channel) {
            await channel.delete("Game was deleted");
        }
        return "HAHA !";
    },
};
