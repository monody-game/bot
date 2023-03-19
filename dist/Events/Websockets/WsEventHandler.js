import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { RedisSubscriber } from "../../Redis/RedisSubscriber.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const subscriber = new RedisSubscriber();
export async function handle() {
    const listenerFiles = readdirSync(join(__dirname)).filter((fileName) => fileName.endsWith("Event.js"));
    const listeners = {};
    for (const fileName of listenerFiles) {
        const imported = await import(join(__dirname, fileName));
        const listener = imported.default;
        listeners[listener.event] = listener.callback;
    }
    await subscriber.subscribe(async (channel, message) => {
        listeners[message.event]?.(message);
    });
}
//# sourceMappingURL=WsEventHandler.js.map