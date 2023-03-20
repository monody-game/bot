import { Client, GatewayIntentBits } from "discord.js";
import "./bootstrap.js";
import EventHandler from "./Events/EventHandler.js";
import { info } from "@moon250/yalogger";
info(`Starting bot in ${process.env.NODE_ENV} mode ...`);
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
});
EventHandler(client);
await client.login(process.env.BOT_TOKEN);
client.user?.setPresence({
    status: "idle",
    activities: [{ name: `la version ${process.env.APP_VERSION}`, type: 2 }],
});
