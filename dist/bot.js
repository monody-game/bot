import { Client, GatewayIntentBits } from "discord.js";
import "./bootstrap.js";
import EventHandler from "./Events/EventHandler.js";
import { info } from "@moon250/yalogger";
info(`Starting bot in dev ${process.env.NODE_ENV} mode ...`);
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
EventHandler(client);
client.login(process.env.BOT_TOKEN);
//# sourceMappingURL=bot.js.map