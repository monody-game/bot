import { client } from "./Connection.js";
import { error } from "@moon250/yalogger";
export class RedisSubscriber {
    sub;
    constructor() {
        this.sub = client.duplicate();
        this.sub.connect();
    }
    async subscribe(callback) {
        await this.sub.pSubscribe("*", async (message, channel) => {
            try {
                const event = JSON.parse(message);
                return await callback(channel, JSON.parse(message));
            }
            catch (e) {
                error(e);
            }
        });
    }
    async unsubscribe() {
        await this.sub.pUnsubscribe("*");
        await this.sub.disconnect();
    }
}
