import { Client } from "discord.js";
import ready from "./Ready.js";
import interactionCreate from "./InteractionCreate.js";

export default async (client: Client): Promise<void> => {
  ready(client);
  interactionCreate(client);
};
