import { Client, GatewayIntentBits } from "discord.js";
import "./bootstrap";
import EventHandler from "./Events/EventHandler";

console.log("Starting ...");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

EventHandler(client);

client.login(process.env.BOT_TOKEN);
