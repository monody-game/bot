import { Client } from "discord.js";
import ready from "./Ready.js";
import interactionCreate from "./InteractionCreate.js";
import { debug } from "@moon250/yalogger";

export default async (client: Client): Promise<void> => {
  debug("Listening and handling events ...");
  ready(client);
  interactionCreate(client);
};
