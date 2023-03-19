import { debug, error } from "@moon250/yalogger";
import { createClient } from "redis";
debug("Connecting to Redis");
const client = createClient({ url: `redis://${process.env.REDIS_HOST}:6379` });
client.on("error", (err) => error("Redis client error :", err));
await client.connect();
export { client };
//# sourceMappingURL=Connection.js.map