import { Client, GatewayIntentBits } from "discord.js";
import "./bootstrap"

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
})

client.login(process.env.BOT_TOKEN)