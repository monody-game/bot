import "./bootstrap.js";
import { Client, GatewayIntentBits } from "discord.js";
import EventHandler from "./Events/EventHandler.js";
import { info } from "@moon250/yalogger";

info(`Starting bot in ${process.env.NODE_ENV} mode ...`);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

await EventHandler(client);

await client.login(process.env.BOT_TOKEN);

client.user?.setPresence({
  status: "idle",
  activities: [{ name: `la version ${process.env.APP_VERSION}`, type: 2 }],
});
