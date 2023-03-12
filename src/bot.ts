import { Client, GatewayIntentBits } from "discord.js";
import "./bootstrap.js";
import EventHandler from "./Events/EventHandler.js";
import {info, log} from "@moon250/yalogger";

info(`Starting bot in dev ${process.env.NODE_ENV} mode ...`);

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

EventHandler(client);

await client.login(process.env.BOT_TOKEN);

client.user?.setPresence({
  status: "idle",
  activities: [
    { name: `la version ${process.env.APP_VERSION}`, type: 2 }
  ]
})