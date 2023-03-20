import { client } from "./Connection.js";
export class RedisSubscriber {
    sub;
    constructor() {
        this.sub = client.duplicate();
        this.sub.connect();
    }
    async subscribe(callback) {
        await this.sub.pSubscribe("*", async (message, channel) => {
            return await callback(channel, JSON.parse(message));
        });
    }
    async unsubscribe() {
        await this.sub.pUnsubscribe("*");
        await this.sub.disconnect();
    }
}
