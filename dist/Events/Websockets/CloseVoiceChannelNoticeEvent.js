export default {
    event: "game.vocal.clear",
    async callback(client, event) {
        const payload = event.data.payload;
        const channel = (await client.channels.fetch(payload.channel_id));
        if (channel) {
            await channel.delete("Game was deleted");
        }
    },
};
