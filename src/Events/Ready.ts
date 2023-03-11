import { Client } from "discord.js";
import { Commands } from "../Commands/CommandList";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) return;

    console.log("Registering slash commands ...");
    await client.application.commands.set(Commands);
    console.log("Done.");

    console.log("Bot is up !");
  });
};
